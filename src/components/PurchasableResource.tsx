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
    <div className={`resource-purchasable`} data-test-id={`resource-purchasable-${props.classNameId}`}>
      <Resource
        name={props.name}
        classNameId={props.classNameId}
        quantityUnit={props.quantityUnit}
        value={props.value}
      />
      <button
        className={`resource__buy-button`}
        onClick={props.onBuyClick}
      >
        Buy <span className="resource__buy-price">({props.currency + props.price})</span>
      </button>
    </div>
  );
};

export default PurchasableResource;
