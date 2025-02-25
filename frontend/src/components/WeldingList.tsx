import React, { ChangeEvent } from 'react';
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

interface VisibleColumns {
  energy: boolean;
  wire: boolean;
  filler: boolean;
  gas: boolean;
  duration: boolean;
  currentmin: boolean;
  currentmax: boolean;
  current: boolean;
  voltagemin: boolean;
  voltagemax: boolean;
  voltage: boolean;
}


const WeldingTrendsChart: React.FC<WeldingTrendsChartProps> = ({ data }) => {

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>({key:"timestamp",direction:"asc"});

  // visible columns states tell react what columns should be visible
  const [visibleColumns, setVisibleColumns] = useState<VisibleColumns>({
    energy: true,
    wire: true,
    filler: true,
    gas: true,
    duration: true,
    currentmin: false,
    currentmax: false,
    current: true,
    voltagemin: false,
    voltagemax: false,
    voltage: true,
  });

  const handleColumnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setVisibleColumns((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // Function to access nested values safely
  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  // handlesort handles the label pressing in the table
  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // formats the time to finnish dates in table
  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("fi-FI", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  };

  // gets correct arrow for table when sorting
  const getSortArrow = (key: string) => {
    if (sortConfig?.key !== key) return "";
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  // sorts the data according to the sort direction and key
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
      <div className="d-flex flex-wrap gap-2">
        {[
          { name: "energy", label: "Energy Consumption" },
          { name: "wire", label: "Wire Used" },
          { name: "filler", label: "Filler Used" },
          { name: "gas", label: "Gas Used" },
          { name: "duration", label: "Weld Duration" },
          { name: "currentmin", label: "Current (Min)" },
          { name: "currentmax", label: "Current (Max)" },
          { name: "current", label: "Current (Avg)" },
          { name: "voltagemin", label: "Voltage (Min)" },
          { name: "voltagemax", label: "Voltage (Max)" },
          { name: "voltage", label: "Voltage (Avg)" },
        ].map((item) => (
          <div className="form-check" key={item.name}>
            <input
              className="form-check-input"
              type="checkbox"
              name={item.name}
              id={item.name}
              checked={visibleColumns[item.name as keyof VisibleColumns]}
              onChange={handleColumnChange}
            />
            <label className="form-check-label" htmlFor={item.name}>
              {item.label}
            </label>
          </div>
        ))}
      </div>

      <div className="table-responsive">
        <table className='table' border={1}>
          <thead>
            <tr>
              <th onClick={() => handleSort("timestamp")}>Timestamp{getSortArrow("timestamp")}</th>
              <th onClick={() => handleSort("weldingMachine.name")}>Machine{getSortArrow("weldingMachine.name")}</th>
              {visibleColumns.energy && (
                <th onClick={() => handleSort("materialConsumption.energyConsumptionAsWh")}>
                  Energy Consumption(Wh){getSortArrow("materialConsumption.energyConsumptionAsWh")}
                </th>
              )}
              {visibleColumns.wire && (
                <th onClick={() => handleSort("materialConsumption.wireConsumptionInMeters")}>
                  Wire Used(m){getSortArrow("materialConsumption.wireConsumptionInMeters")}
                </th>
              )}
              {visibleColumns.filler && (
                <th onClick={() => handleSort("materialConsumption.fillerConsumptionInGrams")}>
                  Filler Used(g){getSortArrow("materialConsumption.fillerConsumptionInGrams")}
                </th>
              )}
              {visibleColumns.gas && (
                <th onClick={() => handleSort("materialConsumption.gasConsumptionInLiters")}>
                  Gas Used(L){getSortArrow("materialConsumption.gasConsumptionInLiters")}
                </th>
              )}
              {visibleColumns.duration && (
                <th onClick={() => handleSort("weldDurationMs.totalMs")}>
                  Weld Duration(ms){getSortArrow("weldDurationMs.totalMs")}
                </th>
              )}
              {visibleColumns.currentmin && (
                <th onClick={() => handleSort("weldingParameters.current.min")}>
                  A(Min){getSortArrow("weldingParameters.current.min")}
                </th>
              )}
              {visibleColumns.currentmax && (
                <th onClick={() => handleSort("weldingParameters.current.max")}>
                  A(Max){getSortArrow("weldingParameters.current.max")}
                </th>
              )}
              {visibleColumns.current && (
                <th onClick={() => handleSort("weldingParameters.current.avg")}>
                  A(Avg){getSortArrow("weldingParameters.current.avg")}
                </th>
              )}
              {visibleColumns.voltagemin && (
                <th onClick={() => handleSort("weldingParameters.voltage.min")}>
                  V(Min){getSortArrow("weldingParameters.voltage.min")}
                </th>
              )}
              {visibleColumns.voltagemax && (
                <th onClick={() => handleSort("weldingParameters.voltage.max")}>
                  V(Max){getSortArrow("weldingParameters.voltage.max")}
                </th>
              )}
              {visibleColumns.voltage && (
                <th onClick={() => handleSort("weldingParameters.voltage.avg")}>
                  V(Avg){getSortArrow("weldingParameters.voltage.avg")}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item._id}>
                <td>{formatTimestamp(item.timestamp)}</td>
                <td>{item.weldingMachine.name} ({item.weldingMachine.model})</td>
                {visibleColumns.energy && <td>{item.materialConsumption.energyConsumptionAsWh}</td>}
                {visibleColumns.wire && <td>{item.materialConsumption.wireConsumptionInMeters}</td>}
                {visibleColumns.filler && <td>{item.materialConsumption.fillerConsumptionInGrams}</td>}
                {visibleColumns.gas && <td>{item.materialConsumption.gasConsumptionInLiters}</td>}
                {visibleColumns.duration && <td>{item.weldDurationMs.totalMs}</td>}
                {visibleColumns.currentmin && <td>{item.weldingParameters.current.min}</td>}
                {visibleColumns.currentmax && <td>{item.weldingParameters.current.max}</td>}
                {visibleColumns.current && <td>{item.weldingParameters.current.avg}</td>}
                {visibleColumns.voltagemin && <td>{item.weldingParameters.voltage.min}</td>}
                {visibleColumns.voltagemax && <td>{item.weldingParameters.voltage.max}</td>}
                {visibleColumns.voltage && <td>{item.weldingParameters.voltage.avg}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default WeldingTrendsChart;
