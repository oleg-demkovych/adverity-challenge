const formatSelectOptions = <TInput = any>(array: TInput[], property: string) =>
  Array.from(
    new Set(
      array
        .filter((el: any) => !!el[property])
        .map((item: any) => item[property])
    )
  ).map((el) => ({
    value: el,
    label: el,
  }));

export default formatSelectOptions;
