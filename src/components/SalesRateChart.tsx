import React from 'react';
import { Chart } from 'react-charts';

interface SalesRateChartProps {
  rateHistory: number[];
};

const SalesRateChart: React.FC<SalesRateChartProps> = (props: SalesRateChartProps) => {
  const series = props.rateHistory.map((dp, i) => [i, dp]);
  const data = React.useMemo(() => [
    {
      label: 'Sales Rate',
      data: series,
    },
  ], [series]);

  const axes = React.useMemo(() => [
    { primary: true, type: 'linear', position: 'bottom', show: true },
    { type: 'linear', position: 'left', show: true },
  ], []);

  return (
    <div
      style={{
        width: '400px',
        height: '300px',
      }}
    >
      <Chart data={data} axes={axes} tooltip />
    </div>
  );
};

export default SalesRateChart;
