import React from 'react';
import Upgrade from '../components/Upgrade';
import { Upgrade as UpgradeType } from '../game/upgrades';
import { getUnlockableUpgrades } from '../game/upgrades';

interface UpgradesProps {
  upgrades: UpgradeType[];
  totalPaper: number;
  currency: string;
  onBuyClick: (id: string, cost: number) => void;
};

const Upgrades: React.FC<UpgradesProps> = (props: UpgradesProps) => {
  const { upgrades, totalPaper, currency } = props;
  return (
    <div className="upgrades">
      {getUnlockableUpgrades(totalPaper, upgrades)
        .map(u => (
          <Upgrade
            id={u.id}
            key={u.id}
            name={u.name}
            cost={u.cost}
            currency={currency}
            onBuyClick={() => props.onBuyClick(u.id, u.cost)}
          />
        ))}
    </div>
  );
};

export default Upgrades;
