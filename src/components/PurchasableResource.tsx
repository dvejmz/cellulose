import React from 'react';
import Resource, { ResourceProps } from './Resource';

type PurchasableResourceProps = ResourceProps &
  {
    onBuyClick: () => void;
    price: number;
    currency: string;
  };

const PurchasableResource: React.FC<PurchasableResourceProps> = (props: PurchasableResourceProps) => {
  return (
    <div className={`resources__${props.classNameId}-container`}>
      <Resource
        name={props.name}
        classNameId={props.classNameId}
        value={props.value}
      />
      <button
        className={`resources__${props.classNameId}-buy-button`}
        onClick={props.onBuyClick}
      >
        <span className="resources__buy-button-text">Buy</span> <span className="resources__pulp-price">({props.currency + props.price})</span>
      </button>
    </div>
  );
};

export default PurchasableResource;
