import React from 'react';
import App from './App';
import { mount, ReactWrapper } from 'enzyme';

describe('App', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('should show make paper button', () => {
    expect(wrapper.exists('.make-paper__button')).toBe(true);
  });

  it('should show current paper element', () => {
    expect(wrapper.exists('.resources__paper')).toBe(true);
  });
});
