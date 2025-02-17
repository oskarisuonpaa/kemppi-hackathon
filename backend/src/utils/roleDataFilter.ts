export const roleDataFilter = (role: string, data: any[]) => {
  let filteredData = data.map((item) => {
    return typeof item.toObject === "function" ? item.toObject() : item;
  });

  if (role === "visitor") {
    filteredData = filteredData.map((item) => {
      delete item.weldingDuration;
      delete item.weldingParameters;
      delete item.materialConsumption;
      delete item.weldDurationMs;
      return item;
    });
  }

  return filteredData;
};
