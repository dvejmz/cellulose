import React from 'react';
import { truncDecimals } from '../utils/math';

interface FundsProps {
  amount: number;
  currency: string;
}

const Funds: React.FC<FundsProps> = (props: FundsProps) => {
  const amount = truncDecimals(props.amount, 2);
  return (
    <div className="funds" data-test-id="funds">
      <strong>Funds:</strong> <span className="funds__currency">{props.currency}</span><span className="funds__amount">{amount}</span>
    </div>
  );
};

export default Funds;
