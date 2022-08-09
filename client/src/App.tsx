import { GeneralProvider } from './context';
import MainPage from './page/MainPage';

function App() {
  return (
    <GeneralProvider>
      <MainPage />
    </GeneralProvider>
  );
}

export default App;
