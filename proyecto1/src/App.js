import Menu from './page/base/menu';
import { FiltroProvider } from './context/FiltroContext';
import './App.css';


function App() {
  return (
    <FiltroProvider>
      <Menu />
    </FiltroProvider>      
  );
}

export default App;
