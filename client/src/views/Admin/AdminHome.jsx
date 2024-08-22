
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons';

import { useUser } from "../../hooks/UseUser";


function AdminHome() {
  const  {logout} = useUser();

  return (
    <main id="admin">
       <header >
        <div id="headerAdmin">
        <h1>ADMIN PANEL</h1>
        <button onClick={logout}><FontAwesomeIcon icon={faPowerOff} /></button>
        </div>
        <nav className='navBar'>
      <Link to="/users"> Utilisateurs</Link>
      <Link to="/products">Produits</Link>
      <Link to="/categories">Catégories</Link>
      <Link to="/orders">Commandes</Link>
    </nav>
    </header>
      
  
   
    
    </main>
  )
}

export default AdminHome; 