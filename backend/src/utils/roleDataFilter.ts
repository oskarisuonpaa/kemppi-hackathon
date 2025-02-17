/**
 *
 * @param role role of the user.
 * @param data data from database to be filtered.
 * @returns filteredData based on the role of the user.
 *
 * This function filters data based on the role of the user.
 */

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