import React from 'react';

export interface UpgradeProps {
  name: string;
  cost: number;
  currency: string;
};

const Upgrade: React.FC<UpgradeProps> = (props: UpgradeProps) => (
  <div className="upgrade" data-test-id="upgrade-ppc-2x">
    2x PPC £100
  </div>
);

export default Upgrade;
