
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons';

import { useUser } from "../../hooks/UseUser";


function AdminHome() {
  const  {logout} = useUser();
  const { user, setUser } = useUser();
  async function logoutHandler(){
      const response = await fetch(
          "http://localhost:9000/api/v1/users/logout",
          {
            method: "GET",
          credentials: "include",
      });
      if (response.ok){
          setUser(null);
         
      }
  } 
  return (
    <main>
       <header>
        <h1>BACK OFFICE</h1>
        <button onClick={logoutHandler}><FontAwesomeIcon icon={faPowerOff} /></button>
    </header>
      <section>
      <h2>ADMIN PANEL</h2>
      <nav>
      <Link to="/users"> <strong>Utilisateurs</strong></Link>
      <Link to="/products"><strong>Produits</strong></Link>
      <Link to="/categories"><strong>Catégories</strong></Link>
      <Link to="/orders"><strong>Commandes</strong></Link>
    </nav>
      </section>
    </main>
  )
}

export default AdminHome; 