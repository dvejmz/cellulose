import React from 'react';
import createApp from './App';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import MakePaperButton from './components/MakePaperButton';

describe('App', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    const initialResources = {
      paper: 0,
      pulp: 10,
    };
    wrapper = mount(createApp(initialResources));
  });

  it('should show make paper button', () => {
    expect(wrapper.exists(MakePaperButton)).toBe(true);
  });

  it('should show initial paper resource value', () => {
    expect(wrapper.find('.resources__paper-value').text()).toEqual('0');
  });

  it('should show current paper counter', () => {
    expect(wrapper.exists('.resources__paper')).toBe(true);
  });

  it('should show initial pulp resource value', () => {
    expect(wrapper.find('.resources__pulp-value').text()).toEqual('10');
  });

  it('should show current pulp counter', () => {
    expect(wrapper.exists('.resources__pulp')).toBe(true);
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

      it('should decrease pulp resource', () => {
        expect(wrapper.find('.resources__pulp').text()).toEqual('Pulp: 9')
      });

      describe('and there is no pulp left', () => {
        beforeEach(() => {
          wrapper = mount(createApp({
            paper: 0,
            pulp: 0,
          }));
          act(() => {
            wrapper.find('.make-paper__button').simulate('click');
          });
        });

        it('does not increase paper counter', () => {
          expect(wrapper.find('.resources__paper-value').text()).toEqual('0');
        });

        it('does not decrease pulp counter', () => {
          expect(wrapper.find('.resources__pulp-value').text()).toEqual('0');
        });
      });
  });
});
