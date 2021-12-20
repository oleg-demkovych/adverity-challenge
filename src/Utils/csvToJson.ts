import { parse } from "papaparse";

const csvToJson = <T>(text: string) => {
  return parse<T>(text, {
    header: true,
    dynamicTyping: true,
  });
};

export default csvToJson;
