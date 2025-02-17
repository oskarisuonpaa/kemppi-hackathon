export const totalWeldsLastWeek = (data: any[]) => {
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const lastWeekWelds = data.filter((weld) => new Date(weld.timestamp) > lastWeek);
  return lastWeekWelds.length;
}

export const mostUsedWeldingMachine = (data: any[]) => {
  const machineCounts = data.reduce((acc: { [key: string]: number }, weld) => {
    acc[weld.weldingMachine.name] = (acc[weld.weldingMachine.name] || 0) + 1;
    return acc;
  }, {});

  const mostUsedMachine = Object.keys(machineCounts).reduce((a, b) =>
    machineCounts[a] > machineCounts[b] ? a : b
  );

  return mostUsedMachine;
}

export const totalWireConsumed = (data: any[]) => {
  const totalWire = data.reduce((acc: number, weld) => {
    acc += weld.materialConsumption.wireConsumptionInMeters;
    return acc;
  }, 0);

  return totalWire;
}