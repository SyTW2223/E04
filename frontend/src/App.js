import logo from './images/NBA-Logo.png';
import './App.css';
import MenuNavegacion from './components/MenuNav';
import { Route, Routes } from 'react-router';
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="App">
      <MenuNavegacion />
      <Routes>
        <Route path="/about" element={<About />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Footer />
    </div>
  );
}

export default App;
