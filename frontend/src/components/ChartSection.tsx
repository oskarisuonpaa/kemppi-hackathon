import axios from "axios";
import React, { useEffect, useState } from "react";
import WeldingTrendsChart from "./WeldingList";
import WeldingComparisonChartEnergy from "./charts/WeldingComparisonChartEnergy";
import WeldingComparisonChartPower from "./charts/WeldingComparisonChartPower";
import UsedWeldingMachinesChart from "./charts/UsedWeldingMachinesChart";
import WeeklyConsumptionChart from "./charts/WeeklyConsumptionChart";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


interface props {
}

interface WeldingData {
    _id: string;
    materialConsumption: {
        energyConsumptionAsWh: number;
        wireConsumptionInMeters: number;
        fillerConsumptionInGrams: number;
        gasConsumptionInLiters: number;
    };
    timestamp: string;
    weldDurationMs: {
        preWeldMs: number;
        weldMs: number;
        postWeldMs: number;
        totalMs: number;
    };
    weldingMachine: {
        model: string;
        serial: string;
        name: string;
        group: string;
    };
    weldingParameters: {
        current: {
            min: number;
            max: number;
            avg: number;
        };
        voltage: {
            min: number;
            max: number;
            avg: number;
        };
    };
}



const ChartSection: React.FC<props> = () => {

    const [weldingData, setWeldingData] = useState<WeldingData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const initialToken = localStorage.getItem("authToken");
    // Tab selector state
    const [activeTab, setActiveTab] = useState<"data" | "charts" | "other">("data");
    // Slider states
    const [sliderValues, setSliderValues] = useState<[number, number]>([0, 0]);
    const [minDate, setMinDate] = useState<number | null>(null);
    const [maxDate, setMaxDate] = useState<number | null>(null);

    useEffect(() => {
        const fetchChartData = async () => {
            setLoading(true);
            try {
                // Adjust the endpoint as needed to point to your charts data route.
                const response = await axios.get<WeldingData[]>(`${backendUrl}/api/data`, {
                    headers: {
                        Authorization: `Bearer ${initialToken}`,
                    },
                })
                const data = response.data
                setWeldingData(response.data);
                // Extract min and max dates (ignoring time)
                const dates = data.map(item => {
                    const date = new Date(item.timestamp);
                    date.setHours(0, 0, 0, 0); // Set time to midnight
                    return date.getTime();
                });
                const min = Math.min(...dates);
                const max = Math.max(...dates);
                setMinDate(min);
                setMaxDate(max);
                setSliderValues([min, max]);

            } catch (err) {
                console.error('Error fetching chart data:', err);
                setError('Failed to fetch chart data.');
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, []);

    const handleSliderChange = (value: number | number[]) => {
        if (Array.isArray(value)) {
            setSliderValues(value as [number, number]);
        }
    };
    // Time filtering for data
    const filteredData = weldingData.filter(item => {
        const itemDate = new Date(item.timestamp);
        itemDate.setHours(0, 0, 0, 0); // Set time to midnight
        const itemTime = itemDate.getTime();
        return itemTime >= sliderValues[0] && itemTime <= sliderValues[1];
    });


    if (loading) return <div>Loading welding data...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <div id="charts" style={{ margin: "20px", textAlign: "center" }}>
                {/* Tabs Navigation */}
                <div style={{ display: "flex", marginBottom: "10px" }}>
                    <button onClick={() => setActiveTab("data")} style={{ padding: "10px", border: "none", cursor: "pointer", background: activeTab === "data" ? "#000000" : "#ddd", color: activeTab === "data" ? "white" : "black", flex: 1 }}>
                        Data
                    </button>
                    <button onClick={() => setActiveTab("charts")} style={{ padding: "10px", border: "none", cursor: "pointer", background: activeTab === "charts" ? "#000000" : "#ddd", color: activeTab === "charts" ? "white" : "black", flex: 1 }}>
                        Welding
                    </button>
                    <button onClick={() => setActiveTab("other")} style={{ padding: "10px", border: "none", cursor: "pointer", background: activeTab === "other" ? "#000000" : "#ddd", color: activeTab === "other" ? "white" : "black", flex: 1 }}>
                        Consumption
                    </button>
                </div>

                {minDate !== null && maxDate !== null && (
                    <div>
                        {/* time filter slider */}
                        <Slider
                            range
                            min={minDate}
                            max={maxDate}
                            value={sliderValues}
                            onChange={handleSliderChange}
                            step={86400000} // Step by one day in milliseconds
                            style={{width:"50%", margin:"auto"}}
                        />
                        <div>
                            <span>Min: {new Date(sliderValues[0]).toLocaleDateString()}</span>
                            <span>Max: {new Date(sliderValues[1]).toLocaleDateString()}</span>
                        </div>
                    </div>
                )}

                {/* Tabs Content */}
                <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "5px", background: "#f9f9f9" }}>
                    {activeTab === "data" ? (
                        <WeldingTrendsChart data={filteredData} />
                    ) : activeTab === "charts" ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "space-between" }}>
                            <WeldingComparisonChartPower chartname={"Power Consumption (kW)"} data={filteredData} />
                            <WeldingComparisonChartEnergy chartname={"Energy Consumption (Wh)"} data={filteredData} />
                            <UsedWeldingMachinesChart data={filteredData} />
                        </div>
                    ) : <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "space-between" }}>
                        <WeeklyConsumptionChart data={filteredData} metric="weldTime" />
                        <WeeklyConsumptionChart data={filteredData} metric="wireConsumption" />
                        <WeeklyConsumptionChart data={filteredData} metric="fillerConsumption" />
                        <WeeklyConsumptionChart data={filteredData} metric="gasConsumption" />
                    </div>}
                </div>
            </div>
        </>
    );
};

export default ChartSection;
