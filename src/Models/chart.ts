export type TCampaign = string;
export type TDatasource = string;
export type TDate = string;
export type TChart = {
  [key: string]: any;
};
export type TItems = TItem[];
export type TItem = {
  Date?: TDate;
  Datasource?: TDatasource;
  Campaign?: TCampaign;
  Clicks?: number;
  Impressions?: number;
};
