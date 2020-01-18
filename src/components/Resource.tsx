import React from 'react';

interface ResourceProps {
  name: string;
  classNameId: string;
  value: number;
  max?: number;
  min?: number;
}


const Resource: React.FC<ResourceProps> = (props: ResourceProps) => {
  const getValue = (): number => {
    if (props.min !== undefined && props.value < props.min) {
      return Math.max(props.value, props.min);
    }

    if (props.max !== undefined && props.value > props.max) {
      return Math.min(props.value, props.max);
    }

    return props.value;
  };

  return (
    <div className={`resources__${props.classNameId}`}>
      <span className={`resources__${props.classNameId}-label capitalise`}>{props.name}</span>: <span className={`resources__${props.classNameId}-value`}>{getValue()}</span>
    </div>
  );
};

export default Resource;
