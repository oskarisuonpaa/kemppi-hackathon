/**
 *
 * @param role Role of the current user.
 * @param allowedGroups An array of group names the current user is allowed to view.
 * @param data Data from the database to be filtered.
 * @returns Filtered data based on the role of the user.
 *
 * For "visitor" role, all sensitive welding-related fields are removed.
 * For "viewer" role, if the weldingMachine.group of an item is not in allowedGroups,
 * the sensitive welding-related fields are removed.
 */
export const roleDataFilter = (role: string, allowedGroups: string[], data: any[]) => {
  let filteredData = data.map((item) =>
    typeof item.toObject === "function" ? item.toObject() : item
  );

  if (role === "visitor") {
    filteredData = filteredData.map((item) => {
      delete item.weldingDuration;
      delete item.weldingParameters;
      delete item.materialConsumption;
      delete item.weldDurationMs;
      return item;
    });
  }

  if (role === "viewer") {
    filteredData = filteredData.filter((item) =>
      allowedGroups.includes(item.weldingMachine.group)
    );
  }

  return filteredData;
};
