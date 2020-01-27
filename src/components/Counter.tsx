import React from 'react';

export enum QuantityUnitAlignment {
  Left,
  Right,
};

export interface CounterProps {
  id: string;
  name: string;
  quantity: number;
  quantityUnit?: string;
  showDecimals?: boolean;
  quantityUnitAlignment?: QuantityUnitAlignment;
}

const formatQuantity = (quantity: number, showDecimals = false): string => (
  showDecimals
    ? quantity.toFixed(2)
    : quantity.toFixed(0)
);

const Counter: React.FC<CounterProps> = (props: CounterProps) => {
  return (
    <div className="counter margin-top-right" data-test-id={`counter-${props.id}`}>
      <strong className={`counter__name capitalise`}>{props.name}</strong>:{' '}
      {props.quantityUnitAlignment === QuantityUnitAlignment.Left && <span className="counter__unit">{props.quantityUnit}</span>}
      <span className={`counter__value`}>{formatQuantity(props.quantity, props.showDecimals)}</span>{' '} 
      {(props.quantityUnitAlignment === QuantityUnitAlignment.Right || props.quantityUnitAlignment === undefined) && <span className="counter__unit">{props.quantityUnit}</span>}
    </div>
  );
};

export default Counter;
