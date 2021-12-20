import { useMemo } from "react";

import Filter from "Components/Filter";
import Chart from "Components/Chart";
import useApp from "Components/App/hooks/useApp";
import { formatSelectOptions } from "Utils";

import classes from "./App.module.css";
export type TFilterTypes = "campaigns" | "datasources";

function App() {
  const { data, chartOptions, handleFilterChange } = useApp();

  const campaignOptions = useMemo(
    () => formatSelectOptions(data, "Campaign"),
    [data]
  );

  const datasourceOptions = useMemo(
    () => formatSelectOptions(data, "Datasource"),
    [data]
  );

  return (
    <div className={classes.App}>
      <h1>Adverity challenge</h1>

      <div className={classes.wrapper}>
        <aside className={classes.sidebar}>
          <h2 className={classes.sidebarTitle}>Filter dimension values</h2>

          {datasourceOptions && (
            <Filter
              onChange={handleFilterChange("datasources")}
              options={datasourceOptions}
              isMulti
              title="Datasource"
            />
          )}

          {campaignOptions && (
            <Filter
              onChange={handleFilterChange("campaigns")}
              options={campaignOptions}
              title="Campaign"
              isMulti
            />
          )}
        </aside>

        <div className={classes.contentArea}>
          {chartOptions && <Chart chartOptions={chartOptions} />}
        </div>
      </div>
    </div>
  );
}

export default App;
