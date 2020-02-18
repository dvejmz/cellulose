import React from 'react';
import { Chart } from 'react-charts';

interface SalesRateChartProps {
  id: string;
  label: string;
  rateHistory: number[];
};

const SalesRateChart: React.FC<SalesRateChartProps> = (props: SalesRateChartProps) => {
  const dataPoints = props.rateHistory.map((dp, i) => [i, dp]);
  const series = React.useMemo(() => ({
    showPoints: false,
  }), []);
  const data = React.useMemo(() => [
    {
      label: 'Sales Rate',
      data: dataPoints,
    },
  ], [dataPoints]);

  const axes = React.useMemo(() => [
    { primary: true, type: 'linear', position: 'bottom' },
    { type: 'linear', position: 'left' },
  ], []);

  return (
    <div
      style={{
        width: '225px',
        height: '150px',
      }}
      data-test-id={`chart-${props.id}`}
    >
      <h4>{props.label}</h4>
      <hr/>
      <Chart data={data} series={series} axes={axes} />
    </div>
  );
};

export default SalesRateChart;
