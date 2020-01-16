import React from 'react';
import App from './App';
import { mount } from 'enzyme';
//import Enzyme from 'enzyme';
//import Adapter from 'enzyme-adapter-react-16';
//
//Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it('should show make paper button', () => {
    const wrapper = mount(<App />);
    expect(wrapper.exists('.make-paper__button')).toBe(true);
  });
});
