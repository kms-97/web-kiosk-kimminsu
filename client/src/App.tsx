import { useContext } from 'react';
import { GeneralProvider, PageContext } from './context';
import CoverPage from './page/CoverPage';

const DefaultPage = CoverPage;

function App() {
  return (
    <GeneralProvider>
      <PageContainer />
    </GeneralProvider>
  );
}

const PageContainer = () => {
  const pages = useContext(PageContext);
  const ActivePage = pages?.state ? [...pages?.state].pop() ?? DefaultPage : DefaultPage;

  return <ActivePage />;
};

export default App;
