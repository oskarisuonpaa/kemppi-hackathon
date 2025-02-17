import axios from "axios";
import React, { useEffect, useState } from "react";
import WeldingTrendsChart from "./WeldingTrendsChart";


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
            <WeldingTrendsChart data={weldingData} />
        </>
    );
};

export default ChartSection;
