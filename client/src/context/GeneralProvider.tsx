import { CategoryProvider } from './Category';
import { OptionProvider } from './Option';
import { OrderProvider } from './Order';
import { PageProvider } from './Page';
import { PaymentProvider } from './Payment';
import { SelectedFoodProvider } from './SelectedFood';

const GeneralProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageProvider>
      <CategoryProvider>
        <OrderProvider>
          <OptionProvider>
            <PaymentProvider>
              <SelectedFoodProvider>{children}</SelectedFoodProvider>
            </PaymentProvider>
          </OptionProvider>
        </OrderProvider>
      </CategoryProvider>
    </PageProvider>
  );
};

export default GeneralProvider;
