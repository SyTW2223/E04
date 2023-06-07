import logo from './logo.png';
import './App.css';
import MenuNavegacion from './components/MenuNav';
import { Route, Routes } from 'react-router';
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Footer } from './components/Footer';
import { Grid } from './components/Grid';

function App() {
  const data = {
    name: 'Banana',
    family: 'Pingas',
    calories: 100,
    fat: 5,
    sugar: 10,
    carbohydrates: 20,
    protein: 15
  };

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
      <Grid data = {data}/>
      <Footer />
    </div>
  );
}

export default App;
