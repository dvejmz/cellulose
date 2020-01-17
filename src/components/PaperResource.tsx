import React from 'react';

interface PaperResourceProps {
  value: number;
}

const PaperResource: React.FC<PaperResourceProps> = (props: PaperResourceProps) => (
  <div className="resources__paper">
    Paper: {props.value}
  </div>
);

export default PaperResource;
