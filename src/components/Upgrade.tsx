import React from 'react';

export interface UpgradeProps {
  name: string;
  cost: number;
  currency: string;
};

const Upgrade: React.FC<UpgradeProps> = (props: UpgradeProps) => (
  <div className="upgrade" data-test-id="upgrade-ppc-2x">
    <button
      className="btn"
    >
      {props.name} ({props.currency}{props.cost})
    </button>
  </div>
);

export default Upgrade;
