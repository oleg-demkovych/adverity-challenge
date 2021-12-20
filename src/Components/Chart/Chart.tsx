import { memo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface IProps {
  chartOptions: {
    [key: string]: any;
  };
}
const Chart: React.FC<IProps> = ({ chartOptions }) => {
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default memo(Chart);
