import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

interface WeldingComparisonChartProps {
    chartname: string;
    chartwidth?: string;
    data: WeldingData[];
}

const WeldingComparisonChart: React.FC<WeldingComparisonChartProps> = ({ chartname, chartwidth, data }) => {
    // Group data by welding machine and calculate total energy consumption
    const groupedData = data.reduce((acc, curr) => {
        const machineName = curr.weldingMachine.name;
        if (!acc[machineName]) {
          acc[machineName] = 0;
        }
        acc[machineName] += Math.round(curr.materialConsumption.energyConsumptionAsWh);
        return acc;
      }, {} as Record<string, number>);

    // Convert grouped data to chart-friendly format
    const chartData = Object.keys(groupedData).map((name) => ({
        machine: name,
        energyConsumption: groupedData[name],
    }));

    return (
        <div style={{ width: chartwidth ? chartwidth : "49%" }}>
            <h3>{chartname}</h3>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="machine" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="energyConsumption" fill="#f57300" name="Energy Consumption (Wh)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeldingComparisonChart;