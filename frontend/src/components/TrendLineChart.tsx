import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

interface TrendlineChartProps {
  data: WeldingData[];
  metric: 'weldTime' | 'wireConsumption' | 'fillerConsumption' | 'gasConsumption';
}

const TrendlineChart: React.FC<TrendlineChartProps> = ({ data, metric }) => {
  // Helper function to get the start of the week for a given date
  const getWeekStart = (date: Date): string => {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startOfWeek.setDate(startOfWeek.getDate() - diff);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek.toISOString().split('T')[0];
  };

  // Helper function to get the ISO week number for a given date
  const getISOWeekNumber = (date: Date): number => {
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = new Date(target.getFullYear(), 0, 4);
    firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);
    const weekNumber = 1 + Math.round(((target.getTime() - firstThursday.getTime()) / 86400000 - 3 + (firstThursday.getDay() + 6) % 7) / 7);
    return weekNumber;
  };

  // Aggregate data on a weekly basis
  const aggregatedData = data.reduce((acc, entry) => {
    const date = new Date(entry.timestamp);
    const weekStart = getWeekStart(date);
    let value;

    switch (metric) {
      case 'weldTime':
        value = entry.weldDurationMs.totalMs / 1000; // Convert ms to seconds
        break;
      case 'wireConsumption':
        value = entry.materialConsumption.wireConsumptionInMeters;
        break;
      case 'fillerConsumption':
        value = entry.materialConsumption.fillerConsumptionInGrams;
        break;
      case 'gasConsumption':
        value = entry.materialConsumption.gasConsumptionInLiters;
        break;
      default:
        value = 0;
    }

    if (!acc[weekStart]) {
      acc[weekStart] = 0;
    }
    acc[weekStart] += value;
    return acc;
  }, {} as Record<string, number>);

  // Convert aggregated data to chart-friendly format with ISO week labels
  const chartData = Object.keys(aggregatedData).map((weekStart) => {
    const weekNumber = getISOWeekNumber(new Date(weekStart));
    return {
      date: weekStart,
      week: `Week ${weekNumber}`,
      value: aggregatedData[weekStart],
    };
  });

  // Determine the label for the Y-axis based on the selected metric
  const yAxisLabel = {
    weldTime: 'Weld Time (s)',
    wireConsumption: 'Wire Consumption (m)',
    fillerConsumption: 'Filler Consumption (g)',
    gasConsumption: 'Gas Consumption (L)',
  };

  return (
    <div style={{ width: '49%' }}>
      <h3 style={{ fontSize: '1.5em', marginBottom: '10px' }}>{`Trendline Chart - ${yAxisLabel[metric]}`}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: yAxisLabel[metric], angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value, name, props) => [`${props.payload.week}: ${value}`]} />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" name={yAxisLabel[metric]} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendlineChart;
