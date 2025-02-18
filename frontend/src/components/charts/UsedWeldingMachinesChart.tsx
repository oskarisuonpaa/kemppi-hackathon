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

interface Props {
  data: WeldingData[];
}

const UsedWeldingMachinesChart: React.FC<Props> = ({ data }) => {
  // Count the occurrences of each welding machine
  const machineCount = data.reduce((acc, curr) => {
    const machineKey = `${curr.weldingMachine.name} (${curr.weldingMachine.model})`;
    if (!acc[machineKey]) {
      acc[machineKey] = 0;
    }
    acc[machineKey]++;
    return acc;
  }, {} as Record<string, number>);

  // Convert the count data to an array and sort it in descending order
  const chartData = Object.keys(machineCount)
    .map((name) => ({
      machine: name,
      count: machineCount[name],
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div style={{ width: '49%' }}>
      <h3 style={{ fontSize: '1.5em', marginBottom: '10px' }}>Welding Machine Usage Count</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart layout="vertical" data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="machine" width={200} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#f57300" name="Usage Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsedWeldingMachinesChart;
