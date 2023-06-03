import logo from './logo.svg';
import './App.css';
import { TestComp } from './components/testComp';
import MenuNavegacion from './components/MenuNav';

function App() {
  return (
    <div className="App">
      <MenuNavegacion />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <TestComp />
      </header>
    </div>
  );
}

export default App;
