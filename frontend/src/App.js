import './App.css';
import MenuNavegacion from './components/MenuNav';
import { Route, Routes } from 'react-router';
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Footer } from './components/Footer';
import { Home } from './components/Home';

function App() {
  return (
    <div className="App">
      <MenuNavegacion />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
