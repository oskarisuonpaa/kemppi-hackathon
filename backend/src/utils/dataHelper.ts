export const totalWeldsLastWeek = async (data: any[]) => {
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const lastWeekWelds = data.filter((weld) => new Date(weld.timestamp) > lastWeek);
  return lastWeekWelds.length;
}