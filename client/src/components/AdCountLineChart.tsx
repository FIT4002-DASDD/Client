/**
 * AdCountLineChart.tsx
 * Chart to display statistics about ads scraped
 * @author Sara Tran
 * @updated 2021-11-18
 */

import React from "react";
import Chart from "react-apexcharts";

interface AdCountDataItem {
  date: number;
  count: number;
}
type AdCountLineChartProps = {
  /**
   * Data to display in the chart
   */
  data: Array<AdCountDataItem>;
  /**
   * Height of the chart
   */
  height?: number;
  /**
   * Title of the chart
   */
  title?: string;
};

/**
 * Chart to display statistics about ads scraped
 */
const AdCountLineChart = (props: AdCountLineChartProps) => {
  const { data, height, title } = props;
  const labels = data?.map((dataPoint) => dataPoint.date);
  const values = data?.map((dataPoint) => dataPoint.count);
  const series = [
    {
      name: "Ads",
      data: values,
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      stacked: false,
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: title ? title : "Ads scraped",
      align: "left",
    },
    yaxis: {
      title: {
        text: "# of Ads",
      },
    },
    xaxis: {
      type: "datetime",
      categories: labels,
    },
  };
  return (
    <Chart options={options} series={series} height={height ? height : 400} />
  );
};

export default AdCountLineChart;
