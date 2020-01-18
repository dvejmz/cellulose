import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Resource from './Resource';

describe('<Resource />', () => {
  let resource: ShallowWrapper;

  beforeEach(() => {
    resource = shallow(<Resource name="Paper" classNameId="paper" value={9001} />);
  });

  it('renders ok', () => {
    expect(resource.exists()).toBeTruthy();
  });

  it('shows resource name', () => {
    expect(resource.find('.resources__paper-label').text()).toBe('Paper')
  });

  it('shows resource value', () => {
    expect(resource.find('.resources__paper-value').text()).toBe('9001');
  });

  it('does not go below specified minimum', () => {
    act(() => {
      resource.setProps({ value: -1000, min: 0 });
    });
    expect(resource.find('.resources__paper-value').text()).toBe('0');
  });

  it('does not go above specified maximum', () => {
    act(() => {
      resource.setProps({ value: 1000, max: 100 });
    });
    expect(resource.find('.resources__paper-value').text()).toBe('100');
  });

  it('shows correct classNames', () => {
    expect(resource.prop('className')).toContain('resources__paper');
    expect(resource.find('.resources__paper-label').exists()).toBeTruthy();
    expect(resource.find('.resources__paper-value').exists()).toBeTruthy();
  });
});
