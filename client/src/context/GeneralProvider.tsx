import { CategoryProvider } from './Category';
import { OptionProvider } from './Option';
import { OrderProvider } from './Order';
import { PageProvider } from './Page';
import { PaymentProvider } from './Payment';

const GeneralProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageProvider>
      <CategoryProvider>
        <OrderProvider>
          <OptionProvider>
            <PaymentProvider>{children}</PaymentProvider>
          </OptionProvider>
        </OrderProvider>
      </CategoryProvider>
    </PageProvider>
  );
};

export default GeneralProvider;
