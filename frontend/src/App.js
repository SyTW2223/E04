import './App.css';
import MenuNavegacion from './components/MenuNav';
import { Route, Routes } from 'react-router';
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LogoutPage from './pages/Logout';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { AuthProvider } from './components/Auth/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <MenuNavegacion />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/logout" element={<LogoutPage />}/>
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
