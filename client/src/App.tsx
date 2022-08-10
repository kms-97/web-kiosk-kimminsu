import { useContext } from 'react';
import { GeneralProvider, PageContext } from './context';
import MainPage from './page/MainPage';

function App() {
  return (
    <GeneralProvider>
      <PageContainer />
    </GeneralProvider>
  );
}

const PageContainer = () => {
  const pages = useContext(PageContext);
  const ActivePage = pages?.state ? [...pages?.state].pop() ?? MainPage : MainPage;

  return (
    <>
      <ActivePage />
    </>
  );
};

export default App;
