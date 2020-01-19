import React from 'react';

export interface ResourceProps {
  name: string;
  classNameId: string;
  value: number;
  quantityUnit: string;
}

const Resource: React.FC<ResourceProps> = (props: ResourceProps) => {
  return (
    <div className={`resources__${props.classNameId}`} data-test-id={`resource-${props.classNameId}`}>
      <span className={`resources__${props.classNameId}-label capitalise`}>{props.name}</span>: <span className={`resources__${props.classNameId}-value`}>{props.value}</span> <span className="resource__unit">{props.quantityUnit}</span>
    </div>
  );
};

export default Resource;
