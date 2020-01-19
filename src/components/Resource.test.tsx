import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import Resource from './Resource';

describe('<Resource />', () => {
  let resource: ShallowWrapper;

  beforeEach(() => {
    resource = shallow(
      <Resource
        name="Paper"
        classNameId="paper"
        quantityUnit="sheets"
        value={9001}
      />);
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

  it('shows resource unit', () => {
    expect(resource.find('.resource__unit').text()).toBe('sheets')
  });

  it('shows correct classNames', () => {
    expect(resource.prop('className')).toContain('resources__paper');
    expect(resource.find('.resources__paper-label').exists()).toBeTruthy();
    expect(resource.find('.resources__paper-value').exists()).toBeTruthy();
  });
});
