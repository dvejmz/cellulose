import React from 'react';
import { shallow } from 'enzyme';
import PaperResource from './PaperResource';

describe('<PaperResource />', () => {
  let paperResource: any;

  beforeEach(() => {
    paperResource = shallow(<PaperResource value={9001} />);
  });

  it('renders ok', () => {
    expect(paperResource.exists()).toBeTruthy();
  });

  it('it shows current paper', () => {
    expect(paperResource.text()).toBe('Paper: 9001')
  });
});
