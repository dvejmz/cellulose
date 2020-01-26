import React from 'react';

export interface CounterProps {
  id: string;
  label: string;
  quantity: number;
  quantityUnit?: string;
  showDecimals?: boolean;
}

const Counter: React.FC<CounterProps> = (props: CounterProps) => {
  const quantity =
    props.showDecimals
      ? props.quantity.toFixed(2)
      : props.quantity.toFixed(0);
  return (
    <div className="counter margin-top-right" data-test-id={`counter-${props.id}`}>
      <strong className={`counter__label capitalise`}>{props.label}</strong>: <span className={`counter__value`}>{quantity}</span> <span className="counter__unit">{props.quantityUnit}</span>
    </div>
  );
};

export default Counter;
