import { useState } from 'react';
import { GeneralProvider } from './context';
import MainPage from './page/MainPage';
import OrderPage from './page/OrderPage';

declare type PAGE = 'main' | 'order';

function App() {
  const [page, setPage] = useState<string>('main');

  return (
    <GeneralProvider>
      {page === 'main' ? <MainPage setPage={setPage} /> : ''}
      {page === 'order' ? <OrderPage /> : ''}
    </GeneralProvider>
  );
}

export default App;
