import React from 'react';
import { useState } from 'react';


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

interface WeldingTrendsChartProps {
  data: WeldingData[];
}



const WeldingTrendsChart: React.FC<WeldingTrendsChartProps> = ({ data }) => {

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  // Function to access nested values safely
  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("fi-FI", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  };

  const getSortArrow = (key: string) => {
    if (sortConfig?.key !== key) return "";
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    const valueA = getNestedValue(b, sortConfig.key);
    const valueB = getNestedValue(a, sortConfig.key);

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA;
    }

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortConfig.direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return 0;
  });

  return (
    <div>
      <h2>Welding Data Trends</h2>
      <table border={1}>
        <thead>
          <tr>
            <th onClick={() => handleSort("timestamp")}>Timestamp{getSortArrow("timestamp")}</th>
            <th onClick={() => handleSort("weldingMachine.name")}>Machine{getSortArrow("weldingMachine.name")}</th>
            <th onClick={() => handleSort("materialConsumption.energyConsumptionAsWh")}>Energy Consumption(Wh){getSortArrow("materialConsumption.energyConsumptionAsWh")}</th>
            <th onClick={() => handleSort("materialConsumption.wireConsumptionInMeters")}>Wire Used(m){getSortArrow("materialConsumption.wireConsumptionInMeters")}</th>
            <th onClick={() => handleSort("materialConsumption.fillerConsumptionInGrams")}>Filler Used(g){getSortArrow("materialConsumption.fillerConsumptionInGrams")}</th>
            <th onClick={() => handleSort("materialConsumption.gasConsumptionInLiters")}>Gas Used(L){getSortArrow("materialConsumption.gasConsumptionInLiters")}</th>
            <th onClick={() => handleSort("weldDurationMs.totalMs")}>Weld Duration(ms){getSortArrow("weldDurationMs.totalMs")}</th>
            <th onClick={() => handleSort("weldingParameters.current.avg")}>A(Avg){getSortArrow("weldingParameters.current.avg")}</th>
            <th onClick={() => handleSort("weldingParameters.voltage.avg")}>V(Avg){getSortArrow("weldingParameters.voltage.avg")}</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item._id}>
              <td>{formatTimestamp(item.timestamp)}</td>
              <td>{item.weldingMachine.name} ({item.weldingMachine.model})</td>
              <td>{item.materialConsumption.energyConsumptionAsWh}</td>
              <td>{item.materialConsumption.wireConsumptionInMeters}</td>
              <td>{item.materialConsumption.fillerConsumptionInGrams}</td>
              <td>{item.materialConsumption.gasConsumptionInLiters}</td>
              <td>{item.weldDurationMs.totalMs}</td>
              <td>{item.weldingParameters.current.avg}</td>
              <td>{item.weldingParameters.voltage.avg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeldingTrendsChart;
