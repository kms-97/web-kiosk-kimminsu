import { CategoryProvider } from './Category';
import { OptionProvider } from './Option';
import { OrderProvider } from './Order';
import { SelectedFoodProvider } from './SelectedFood';

const GeneralProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CategoryProvider>
      <OrderProvider>
        <OptionProvider>
          <SelectedFoodProvider>{children}</SelectedFoodProvider>
        </OptionProvider>
      </OrderProvider>
    </CategoryProvider>
  );
};

export default GeneralProvider;
