import logo from './logo.png';
import './App.css';
import MenuNavegacion from './components/MenuNav';
import { Route, Routes } from 'react-router';
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="App">
      <MenuNavegacion />
      <Routes>
        <Route path="/profile" element={<Profile />}/>
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
