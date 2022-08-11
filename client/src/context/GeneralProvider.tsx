import { CategoryProvider } from './Category';
import { OptionProvider } from './Option';
import { OrderProvider } from './Order';

const GeneralProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CategoryProvider>
      <OrderProvider>
        <OptionProvider>{children}</OptionProvider>
      </OrderProvider>
    </CategoryProvider>
  );
};

export default GeneralProvider;
