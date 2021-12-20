import React, { memo } from "react";

import Select from "react-select";

import type { TOptions } from "Models/filter";
import { MenuList, Option } from ".";

import classes from "./Filter.module.css";

interface IFilter {
  onChange: (newValue: any) => void;
  options: TOptions;
  isMulti?: boolean;
  title?: string;
  values?: any;
}

const Filter: React.FC<IFilter> = ({
  onChange,
  options,
  isMulti = false,
  title,
}) => {
  return (
    <section className={classes.filter}>
      <h4 className={classes.title}>{title}</h4>
      <Select
        options={options}
        onChange={onChange}
        isMulti={isMulti}
        components={{
          MenuList,
          Option,
        }}
      />
    </section>
  );
};

export default memo(Filter);
