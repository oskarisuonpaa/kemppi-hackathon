import React from 'react';

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
  data: WeldingData[];
}

const WeldingComparisonChart: React.FC<WeldingComparisonChartProps> = ({ data }) => {
  // Group data by welding machine and calculate total energy consumption
  const groupedData = data.reduce((acc, curr) => {
    const machineName = curr.weldingMachine.name;
    if (!acc[machineName]) {
      acc[machineName] = 0;
    }
    acc[machineName] += curr.materialConsumption.energyConsumptionAsWh;
    return acc;
  }, {} as Record<string, number>);

  // Convert grouped data to chart-friendly format
  const chartData = Object.keys(groupedData).map((name) => ({
    machine: name,
    energyConsumption: groupedData[name],
  }));

  return (
    <div>
    </div>
  );
};

export default WeldingComparisonChart;
