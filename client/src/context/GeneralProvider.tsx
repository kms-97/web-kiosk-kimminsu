import { CategoryProvider } from './Category';
import { OrderProvider } from './Order';
import { SelectedFoodProvider } from './SelectedFood';

const GeneralProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <CategoryProvider>
      <OrderProvider>
        <SelectedFoodProvider>{children}</SelectedFoodProvider>
      </OrderProvider>
    </CategoryProvider>
  );
};

export default GeneralProvider;
