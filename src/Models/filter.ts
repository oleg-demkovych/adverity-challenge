export type TOption = { value: string | number; label: string };
export type TOptions = TOption[];
export type TFilterTypes = "campaigns" | "datasources";
export type TFilterValue = {
  label: string;
  value: string | number;
};
export type TFilters = {
  [K in TFilterTypes]: Pick<TFilterValue, "value">[];
};
