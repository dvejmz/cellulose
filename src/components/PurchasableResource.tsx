import React from 'react';
import Resource, { ResourceProps } from './Resource';

import './PurchasableResource.scss';

type PurchasableResourceProps = ResourceProps &
  {
    onBuyClick: () => void;
    price: number;
    currency: string;
  };

const PurchasableResource: React.FC<PurchasableResourceProps> = (props: PurchasableResourceProps) => {
  return (
    <div className={`resource-purchasable`} data-test-id={`resource-purchasable-${props.id}`}>
      <Resource {...props} />
      <button
        className={`resource-purchasable__buy-button btn btn-sm`}
        onClick={props.onBuyClick}
      >
        Buy <span className="resource-purchasable__buy-price">({`${props.currency}${props.price}`})</span>
      </button>
    </div>
  );
};

export default PurchasableResource;
