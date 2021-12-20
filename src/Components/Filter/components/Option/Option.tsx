import cx from "classnames";

import classes from "../../Filter.module.css";

interface IOption {
  children: any;
  isSelected: any;
  innerProps: any;
}

const Option = ({ children, isSelected, innerProps }: IOption) => (
  <div
    className={cx(classes.selectOption, {
      [classes["selectOptionSelected"]]: isSelected,
    })}
    id={innerProps.id}
    tabIndex={innerProps.tabIndex}
    onClick={innerProps.onClick}
  >
    {children}
  </div>
);

export default Option;
