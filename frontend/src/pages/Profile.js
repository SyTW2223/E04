import React, { useContext } from 'react'
import { GridProfile } from '../components/GridProfile';
import { AuthContext } from '../components/Auth/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }
  else { 
    return (
      <div className='App'>
        <h1 className='page-header'>Perfil</h1>
        <GridProfile></GridProfile>
      </div>
    )
  }
}

export default Profile;