import React from 'react';
import { Resource as ResourceType } from '../models/resource';
import Counter, { CounterProps } from './Counter';

export type ResourceProps = CounterProps & ResourceType;

const Resource: React.FC<ResourceProps> = (props: ResourceProps) => (
  <div className="resource">
    <Counter {...props} />
  </div>
);

export default Resource;
