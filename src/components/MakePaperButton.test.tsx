import React from 'react';
import { shallow } from 'enzyme';
import MakePaperButton from './MakePaperButton';

describe('<MakePaperButton />', () => {
  let makePaperButton: any;

  beforeEach(() => {
    makePaperButton = shallow(<MakePaperButton onClick={() => {}} />);
  });

  it('renders ok', () => {
    expect(makePaperButton.text()).toBe('Make Paper');
  });
});
