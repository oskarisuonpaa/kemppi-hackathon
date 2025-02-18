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

const WeldingComparisonChartModel: React.FC<WeldingComparisonChartProps> = ({ chartname, chartwidth, data }) => {
  // Group data by welding machine and model, and calculate normalized energy consumption
  const groupedData = data.reduce((acc, curr) => {
    const machineKey = `${curr.weldingMachine.name}`;
    const weldDurationHours = curr.weldDurationMs.totalMs / 3600000; // Convert ms to hours
    const normalizedEnergyConsumption = Math.round(curr.materialConsumption.energyConsumptionAsWh / weldDurationHours / 1000);

    if (!acc[machineKey]) {
      acc[machineKey] = 0;
    }
    acc[machineKey] += normalizedEnergyConsumption;
    return acc;
  }, {} as Record<string, number>);

  // Convert grouped data to chart-friendly format
  const chartData = Object.keys(groupedData).map((name) => ({
    machine: name,
    energyConsumption: groupedData[name],
  }));

  return (
    <div style={{ width: chartwidth ? chartwidth : "45%" }}>
      <h3>{chartname}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="machine" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="energyConsumption" fill="#f57300" name="Power Consumption (kW)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeldingComparisonChartModel;
