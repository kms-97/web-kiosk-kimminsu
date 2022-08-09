import { OrderProvider } from './Order';
import { SelectedFoodProvider } from './SelectedFood';

const GeneralProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <OrderProvider>
      <SelectedFoodProvider>{children}</SelectedFoodProvider>
    </OrderProvider>
  );
};

export default GeneralProvider;
