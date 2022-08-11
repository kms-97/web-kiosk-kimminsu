import Router from 'router';
import { GeneralProvider } from './context';

function App() {
  return (
    <GeneralProvider>
      <Router />
    </GeneralProvider>
  );
}

export default App;
