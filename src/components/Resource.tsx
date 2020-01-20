import React from 'react';
import { Resource as ResourceType } from '../models/resource';

export type ResourceProps = ResourceType & {
  classNameId: string;
}

const Resource: React.FC<ResourceProps> = (props: ResourceProps) => {
  return (
    <div className="resource margin-top-right" data-test-id={`resource-${props.classNameId}`}>
      <strong className={`resource__label capitalise`}>{props.name}</strong>: <span className={`resource__value`}>{props.quantity}</span> <span className="resource__unit">{props.quantityUnit}</span>
    </div>
  );
};

export default Resource;
