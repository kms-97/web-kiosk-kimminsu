import GeneralProvider from './context/GeneralContext';
import MainPage from './page/MainPage';

function App() {
  return (
    <GeneralProvider>
      <MainPage />
    </GeneralProvider>
  );
}

export default App;
