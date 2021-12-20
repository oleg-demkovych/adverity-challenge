import { useRef } from "react";
import { Virtuoso } from "react-virtuoso";

interface IMenuList {
  options: any;
  children: any;
  getValue: any;
}

const MenuList = ({ options, children, getValue }: IMenuList) => {
  const [value] = getValue();
  const ref = useRef<any>(null);

  if (value) {
    ref.current?.scrollToIndex({
      index: options.findIndex((x: any) => x.value === value?.value),
    });
  }

  return Array.isArray(children) ? (
    <Virtuoso
      ref={ref}
      style={{ height: "150px" }}
      totalCount={children.length}
      itemContent={(index) => <div>{children[index]}</div>}
    />
  ) : (
    <div>{children}</div>
  );
};

export default MenuList;
