/**
 * CategoryBotStatsChart.tsx
 * Chart to display correlation between categories and bot properties (political alignment, gender)
 * @author Andy Zhan
 * @updated 2021-11-18
 */

import Chart from "react-apexcharts";
import "./styles/CategoryBotStatsChart.css";

// Chart config
const options: ApexCharts.ApexOptions = {
  chart: {
    zoom: {
      enabled: false,
    },
  },

  xaxis: {
    tickAmount: 2,
    min: 0,
    max: 4,
    title: {
      text: "Political inclination",
    },
    crosshairs: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    min: 0,
    max: 1,
    tickAmount: 1,
    labels: {
      show: true,
      formatter: (value: any) => {
        return value === 1.0 ? "Male" : "Female";
      },
    },
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  grid: {
    show: false,
  },
  title: {
    text: "Correlation between categories and bot properties",
  },
  legend: {
    position: "right",
    show: true,
    onItemHover: {
      highlightDataSeries: true,
    },
  },
  tooltip: {
    custom: ({ seriesIndex, w }) => {
      let g = Math.round(w.globals.series[seriesIndex][0] * 1000) / 10;
      let pol = w.globals.seriesX[seriesIndex][0].toFixed(2);
      return `<div class="tooltip">
          <div><b>${w.globals.seriesNames[seriesIndex]}</b></div>
          <div>
           Gender Distribution: ${g}% Male, ${100 - g}% Female
          </div><div>
            Avg. Political Inclination: ${pol}
        </div></div>`;
    },
  },
};

interface CategoryDataItem {
  id?: number | string;
  label: string;
  /**
   * Average gender (where Female = 0, Male = 1, Other = 0.5)
   */
  avgGender: number;
  /**
   * Average political inclination (0-4)
   */
  avgPolitical: number;
}
type CategoryBotStatsChartProps = {
  /**
   * Data for the CategoryBotStatsChart
   */
  data: Array<CategoryDataItem>;
  /**
   * Height of the chart
   */
  height?: number;
};
const CategoryBotStatsChart = (props: CategoryBotStatsChartProps) => {
  const { data, height } = props;

  const chartSeries = data.map((point) => ({
    name: point.label,
    data: [[point.avgPolitical, point.avgGender]],
  }));
  return (
    <Chart
      options={options}
      series={chartSeries}
      type="scatter"
      height={height ? height : 400}
    />
  );
};

export default CategoryBotStatsChart;
