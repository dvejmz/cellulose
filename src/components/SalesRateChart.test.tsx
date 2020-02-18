import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import SalesRateChart from './SalesRateChart';

describe('<SalesRateChart />', () => {
  let chart: ReactWrapper;

  beforeEach(() => {
    const rateHistory = [1, 2, 3, 4, 5, 6];
    chart = mount(<SalesRateChart id="paper-demand" label="Paper Demand" rateHistory={rateHistory} />);
  });

  it('renders', () => {
    expect(chart).toMatchSnapshot();
  });
});
