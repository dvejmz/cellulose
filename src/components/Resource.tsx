import React from 'react';

export interface ResourceProps {
  name: string;
  classNameId: string;
  value: number;
  quantityUnit: string;
}

const Resource: React.FC<ResourceProps> = (props: ResourceProps) => {
  return (
    <div className="resource" data-test-id={`resource-${props.classNameId}`}>
      <span className={`resource__label capitalise`}>{props.name}</span>: <span className={`resource__value`}>{props.value}</span> <span className="resource__unit">{props.quantityUnit}</span>
    </div>
  );
};

export default Resource;
