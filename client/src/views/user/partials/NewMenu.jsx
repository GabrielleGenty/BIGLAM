import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../hooks/UseUser'; // Import useUser

function NewMenu() {
  const { user, logout } = useUser(); // Destructure user and logout from useUser

  return (
    <nav className="menu">
      <Link to="/" className='bar-nav'>Accueil</Link>
      <Link to="/aboutUs"  className='bar-nav'>a Propos </Link>
      <Link to="/promotion"  className='bar-nav'>En Promotion </Link>
      <Link to="/newCollection"  className='bar-nav'>Nouvelle collection</Link>

      {/* Account Section */}
      {user.isLogged ? (
    
      
          <button onClick={logout}>Déconnexion</button>
      
      ) : null}
    </nav>
  );
}

export default NewMenu;
