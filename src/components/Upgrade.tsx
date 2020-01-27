import React from 'react';

export interface UpgradeProps {
  id: string;
  name: string;
  cost: number;
  currency: string;
  onBuyClick: (id: string, cost: number) => void;
};

const Upgrade: React.FC<UpgradeProps> = (props: UpgradeProps) => (
  <div className="upgrade" data-test-id={props.id}>
    <button
      className="btn"
      onClick={() => props.onBuyClick(props.id, props.cost)}
    >
      {props.name} ({props.currency}{props.cost})
    </button>
  </div>
);

export default Upgrade;
