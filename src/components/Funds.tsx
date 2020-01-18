import React from 'react';

interface FundsProps {
  amount: number;
  currency: string;
}

const Funds: React.FC<FundsProps> = (props: FundsProps) => {
  return (
    <div className="resources__funds">
      Funds: <span className="resources__funds-currency">{props.currency}</span><span className="resources__funds-amount">{props.amount}</span>
    </div>
  );
};

export default Funds;
