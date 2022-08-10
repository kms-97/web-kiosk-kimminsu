import React, { useState, createContext, Dispatch, SetStateAction } from 'react';

interface Context<T> {
  state: T | null;
  action: {
    setState: Dispatch<SetStateAction<T | null>>;
  };
}

const PaymentContext = createContext<Context<'card' | 'cash'> | null>(null);
const CreditContext = createContext<Context<number> | null>(null);

const PaymentProvider = ({ children }: { children: React.ReactNode }) => {
  const [payment, setPayment] = useState<'card' | 'cash' | null>(null);
  const [credit, setCredit] = useState<number | null>(0);

  const paymentContext = {
    state: payment,
    action: {
      setState: setPayment,
    },
  };

  const creditContext = {
    state: credit,
    action: {
      setState: setCredit,
    },
  };

  return (
    <PaymentContext.Provider value={paymentContext}>
      <CreditContext.Provider value={creditContext}>{children}</CreditContext.Provider>
    </PaymentContext.Provider>
  );
};

export { PaymentProvider, CreditContext, PaymentContext };
