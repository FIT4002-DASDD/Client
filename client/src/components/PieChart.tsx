/**
 * PieChart.tsx
 * Pie chart component for bot alignment
 * @author Sara Tran
 * @updated 2021-11-18
 */

import React from "react";
import Chart from "react-apexcharts";

interface PieChartDataItem {
  label: string;
  count: number;
}
type PieChartProps = {
  /**
   * Data to display in the chart
   */
  data: Array<PieChartDataItem>;
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
 * Pie chart component for bot alignment
 */
const PieChart = (props: PieChartProps) => {
  const { data, height, title } = props;
  const labels = data?.map((dataPoint) => dataPoint.label.toString());
  const values = data?.map((dataPoint) => dataPoint.count);

  const options: ApexCharts.ApexOptions = {
    legend: {
      show: true,
      position: "bottom",
    },
    chart: {
      toolbar: {
        show: true,
      },
    },
    labels: labels,
    title: {
      text: title ? title : "Bot alignment",
    },
  };

  return (
    <Chart
      options={options}
      series={values}
      type="pie"
      height={height ? height : 400}
    />
  );
};

export default PieChart;
