import { URL } from "Constants/api";

export const fetchData = async () => {
  const resp = await fetch(URL);

  return await resp.text();
};
