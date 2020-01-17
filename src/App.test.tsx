import React from 'react';
import App from './App';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import MakePaperButton from './components/MakePaperButton';
import PaperResource from './components/PaperResource';

describe('App', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  });

  it('should show make paper button', () => {
    expect(wrapper.exists(MakePaperButton)).toBe(true);
  });

  it('should show current paper element', () => {
    expect(wrapper.exists(PaperResource)).toBe(true);
  });

  describe('when make paper button is clicked', () => {
      beforeEach(() => {
        act(() => {
          wrapper.find('.make-paper__button').simulate('click');
        });
      });

      it('should increase paper resource', () => {
        expect(wrapper.find(PaperResource).text()).toEqual('Paper: 1');
      });
  });
});
