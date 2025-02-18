import axios from "axios";
import React, { useEffect, useState } from "react";
import WeldingTrendsChart from "./WeldingList";
import WeldingComparisonChart from "./WeldingComparisonChart";
import WeldingComparisonChartModel from "./WeldingComparisonChartModel";
import UsedWeldingMachinesChart from "./UsedWeldingMachinesChart";
import TrendlineChart from "./TrendlineChart";
import WeeklyConsumptionChart from "./WeeklyConsumptionChart";


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
                setWeldingData(response.data);
            } catch (err) {
                console.error('Error fetching chart data:', err);
                setError('Failed to fetch chart data.');
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, []);

    if (loading) return <div>Loading welding data...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <div style={{ margin: "20px", textAlign: "center" }}>
                {/* Tabs Navigation */}
                <div style={{ display: "flex", marginBottom: "10px" }}>
                    <button onClick={() => setActiveTab("data")}style={{padding: "10px",border: "none",cursor: "pointer", background: activeTab === "data" ? "#000000" : "#ddd",color: activeTab === "data" ? "white" : "black",flex: 1}}>
                        Data
                    </button>
                    <button onClick={() => setActiveTab("charts")} style={{padding: "10px",border: "none",cursor: "pointer",background: activeTab === "charts" ? "#000000" : "#ddd",color: activeTab === "charts" ? "white" : "black",flex: 1}}>
                        Charts
                    </button>
                    <button onClick={() => setActiveTab("other")} style={{padding: "10px",border: "none",cursor: "pointer",background: activeTab === "other" ? "#000000" : "#ddd",color: activeTab === "other" ? "white" : "black",flex: 1}}>
                        Other
                    </button>
                </div>

                {/* Tabs Content */}
                <div style={{padding: "20px",border: "1px solid #ddd",borderRadius: "5px",background: "#f9f9f9" }}>
                    {activeTab === "data" ? (
                        <WeldingTrendsChart data={weldingData} />
                    ) : activeTab === "charts" ? (
                        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: "space-between"}}>
                        <WeldingComparisonChartModel chartname={"Power Consumption (kW)"} data={weldingData} />
                        <WeldingComparisonChart chartname={"Energy Consumption (Wh)"} data={weldingData} />
                        <UsedWeldingMachinesChart data={weldingData} />
                        <WeeklyConsumptionChart data={weldingData} metric="weldTime" />
                        <WeeklyConsumptionChart data={weldingData} metric="wireConsumption" />
                        <WeeklyConsumptionChart data={weldingData} metric="fillerConsumption" />
                        <WeeklyConsumptionChart data={weldingData} metric="gasConsumption" />
                        </div>
                    ) : <div>
                        </div>}
                </div>
            </div>
        </>
    );
};

export default ChartSection;
