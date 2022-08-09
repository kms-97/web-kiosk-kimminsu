import GeneralProvider from './context/GeneralProvider';
import MainPage from './page/MainPage';

function App() {
  return (
    <GeneralProvider>
      <MainPage />
    </GeneralProvider>
  );
}

export default App;
