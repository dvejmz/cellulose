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

  it('should show make paper button', () => (
    expect(wrapper.exists(MakePaperButton)).toBe(true)
  ));

  it('should show initial paper resource value', () => (
    expect(findResourceValue(wrapper, 'paper')).toEqual('0')
  ));

  it('should show current paper counter', () => (
    expect(wrapper.exists('.resources__paper')).toBe(true)
  ));

  it('should show initial pulp resource value', () => (
    expect(findResourceValue(wrapper, 'pulp')).toEqual('10')
  ));

  it('should show current pulp counter', () => (
    expect(wrapper.exists('.resources__pulp')).toBe(true)
  ));

  describe('when make paper button is clicked', () => {
      beforeEach(() => {
        act(() => {
          wrapper.find('.make-paper__button').simulate('click');
        });
      });

      it('should increase paper resource', () => (
        expect(findResourceValue(wrapper, 'paper')).toEqual('1')
      ));

      it('should decrease pulp resource', () => {
        expect(findResourceValue(wrapper, 'pulp')).toEqual('9')
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

        it('does not increase paper counter', () => (
          expect(findResourceValue(wrapper, 'paper')).toEqual('0')
        ));

        it('does not decrease pulp counter', () => (
          expect(findResourceValue(wrapper, 'pulp')).toEqual('0')
        ));
      });
  });
});

const findResourceValue = (wrapper: ReactWrapper, resourceClassId: string): string | number => (
  wrapper.find(`.resources__${resourceClassId}-value`).text()
);
