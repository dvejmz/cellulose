import React from 'react';

interface ResourceProps {
  name: string;
  classNameId: string;
  value: number;
  max?: number;
  min?: number;
}

const Resource: React.FC<ResourceProps> = (props: ResourceProps) => (
  <div className={`resources__${props.classNameId}`}>
    <span className={`resources__${props.classNameId}-label capitalise`}>{props.name}</span>: <span className={`resources__${props.classNameId}-value`}>{props.value}</span>
  </div>
);

export default Resource;
