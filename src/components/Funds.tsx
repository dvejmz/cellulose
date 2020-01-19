import React from 'react';

interface FundsProps {
  amount: number;
  currency: string;
}

const Funds: React.FC<FundsProps> = (props: FundsProps) => {
  return (
    <div className="funds" data-test-id="funds">
      Funds: <span className="funds__currency">{props.currency}</span><span className="funds__amount">{props.amount.toFixed(2)}</span>
    </div>
  );
};

export default Funds;
