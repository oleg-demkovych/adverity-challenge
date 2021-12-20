import { parse as dateParse } from "date-fns";

const getFormattedChartData = (items: any[], field: string) =>
  items.map((el: any) => {
    return [dateParse(el.Date, "dd.MM.yyyy", new Date()).getTime(), el[field]];
  });

export default getFormattedChartData;
