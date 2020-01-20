import React from 'react';
import { Resource as ResourceType } from '../models/resource';

export type ResourceProps = ResourceType & {
  classNameId: string;
  showDecimals?: boolean;
}

const Resource: React.FC<ResourceProps> = (props: ResourceProps) => {
  const quantity =
    props.showDecimals
      ? props.quantity.toFixed(2)
      : props.quantity.toFixed(0);
  return (
    <div className="resource margin-top-right" data-test-id={`resource-${props.classNameId}`}>
      <strong className={`resource__label capitalise`}>{props.name}</strong>: <span className={`resource__value`}>{quantity}</span> <span className="resource__unit">{props.quantityUnit}</span>
    </div>
  );
};

export default Resource;
