import React from 'react';
import App from './App';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import MakePaperButton from './components/MakePaperButton';

describe('App', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('should show make paper button', () => {
    expect(wrapper.exists(MakePaperButton)).toBe(true);
  });

  it('should show current paper counter', () => {
    expect(wrapper.exists('.resources__paper')).toBe(true);
  });

  describe('when make paper button is clicked', () => {
      beforeEach(() => {
        act(() => {
          wrapper.find('.make-paper__button').simulate('click');
        });
      });

      it('should increase paper resource', () => {
        expect(wrapper.find('.resources__paper').text()).toEqual('Paper: 1');
      });
  });
});
