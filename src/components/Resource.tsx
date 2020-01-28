import React from 'react';
import { Resource as ResourceType } from '../game/resources';
import Counter, { CounterProps } from './Counter';

export type ResourceProps = CounterProps & ResourceType;

const Resource: React.FC<ResourceProps> = (props: ResourceProps) => (
  <div className="resource">
    <Counter {...props} />
  </div>
);

export default Resource;
