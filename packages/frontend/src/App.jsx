import './App.css';
import Routes from './components/routes';
import RootProvider from './root-provider';

function App() {
  return (
    <RootProvider>
      <Routes />
    </RootProvider>
  );
}

export default App;
