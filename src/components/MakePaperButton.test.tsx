import { shallow } from 'enzyme';
import React from 'react';
import MakePaperButton from './MakePaperButton';

describe('<MakePaperButton />', () => {
  let makePaperButton: any;

  beforeEach(() => {
    makePaperButton = shallow(<MakePaperButton onClick={() => {}} />); // tslint:disable-line no-empty
  });

  it('renders', () => {
    expect(makePaperButton).toMatchSnapshot();
  });
});
