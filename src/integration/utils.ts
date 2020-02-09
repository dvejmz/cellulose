import { ReactWrapper } from 'enzyme';

export const expectResourceValue = (wrapper: ReactWrapper, testId: string, expectedValue: string): void => (
  expect(findCounterValue(wrapper, testId)).toEqual(expectedValue)
);

export const expectFundsValue = (wrapper: ReactWrapper, expectedAmount: string): void => (
  expect(getByTestId(wrapper, 'funds')
    .find('.funds__amount').text())
    .toEqual(expectedAmount)
);

export const findCounterValue = (wrapper: ReactWrapper, testId: string): string | number => (
  getByTestId(wrapper, testId)
    .find(`.counter__value`).text()
);

export const getByTestId = (wrapper: ReactWrapper, testId: string): ReactWrapper => (
  wrapper.find(`[data-test-id="${testId}"]`)
);

