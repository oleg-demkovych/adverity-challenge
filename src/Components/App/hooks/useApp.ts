import { useCallback, useState, useEffect, useMemo, useRef } from "react";
import Highcharts from "highcharts";

import { TItems } from "Models/chart";
import { TFilters, TFilterValue, TFilterTypes } from "Models/filter";
import { csvToJson, getFormattedChartData } from "Utils";
import { appApi } from "../";

const chartOpts = {
  xAxis: {
    type: "datetime",
    labels: {
      formatter: function (this: { value: number }) {
        return Highcharts.dateFormat("%e. %b", this.value);
      },
    },
    ordinal: false,
    minPadding: 0,
    maxPadding: -0.843,
    tickInterval: 7 * 24 * 3600 * 1000, // one week
    gridLineWidth: 1,
  },
  yAxis: [
    {
      title: {
        text: "Clicks",
      },
    },
    {
      title: {
        text: "Impressions",
      },
      linkedTo: 0,
      opposite: true,
    },
  ],
  series: [
    {
      name: "Clicks",
      lineWidth: 1,
      marker: {
        enabled: false,
      },
      data: [],
    },
    {
      name: "Impressions",
      lineWidth: 1,
      marker: {
        enabled: false,
      },
      data: [],
    },
  ],
  chart: {
    type: "line",
    zoomType: "x",
    panning: true,
    panKey: "shift",
  },
  title: {
    text: 'Datasource "Doubleclick (dfa)" and "Meetrics"; All Campaigns',
  },
};

const useApp = () => {
  const [data, setData] = useState<TItems>([]);
  const [filters, setFilters] = useState<TFilters>({
    campaigns: [],
    datasources: [],
  });
  const [chartOptions, setChartOptions] = useState(chartOpts);

  const filteredItems = useMemo(() => {
    const { campaigns, datasources } = filters;

    const campaignsList = (campaign: any) =>
      campaigns?.length ? campaigns.includes(campaign) : true;
    const datasourcesList = (datasource: any) =>
      datasources?.length ? datasources.includes(datasource) : true;

    return data?.filter(
      (item) =>
        campaignsList(item?.Campaign) && datasourcesList(item?.Datasource)
    );
  }, [data, filters]);

  const getData = useCallback(async () => {
    const parsedCsv = csvToJson<TItems>(await appApi.fetchData());

    if (parsedCsv?.data) {
      setData(parsedCsv.data as TItems);
    }
  }, []);

  const handleFilterChange = useCallback(
    (filterType: TFilterTypes) => (values: TFilterValue[]) => {
      setFilters((prev) => ({
        ...prev,
        [filterType]: values.map((el: any) => el.value),
      }));
    },
    []
  );

  useEffect(() => {
    // Initially load a data
    getData();
  }, [getData]);

  useEffect(() => {
    if (!filteredItems) {
      return;
    }

    // Update chart when filter selected
    setChartOptions((prev: any) => ({
      ...prev,
      series: [
        {
          data: getFormattedChartData(filteredItems, "Clicks"),
        },
        {
          data: getFormattedChartData(filteredItems, "Impressions"),
        },
      ],
    }));
  }, [filters, filteredItems]);

  return { data, chartOptions, handleFilterChange };
};

export default useApp;
