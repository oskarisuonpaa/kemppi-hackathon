import axios from "axios";
import React, { useEffect, useState } from "react";

interface BackendData {
    // Use an index signature if you don't know the exact shape of the data.
    [key: string]: any;
  }

interface props {
}

const ChartSection: React.FC<props> = () => {

    const [data, setData] = useState<BackendData>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const initialToken = localStorage.getItem("authToken");

    useEffect(() => {
        const fetchChartData = async () => {
            setLoading(true);
            try {
                // Adjust the endpoint as needed to point to your charts data route.
                const response = await axios.get(`${backendUrl}/api/data`, {
                    headers: {
                      Authorization: `Bearer ${initialToken}`,
                    },
                  })
                console.log(response.data)
                setData(response.data);
            } catch (err) {
                console.error('Error fetching chart data:', err);
                setError('Failed to fetch chart data.');
            } finally {
                setLoading(false);
            }
        };

        fetchChartData();
    }, [backendUrl]);

    return (
        <>
            Here is data: {data}
        </>
    );
};

export default ChartSection;
