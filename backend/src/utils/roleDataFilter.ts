import { totalWeldsLastWeek } from "./dataHelper";

export const roleDataFilter = (role: string, data: any[]) => {
  const lastWeekWelds = totalWeldsLastWeek(data);
  console.log(lastWeekWelds)
};