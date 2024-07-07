import { Link } from "react-router-dom";
import {useEffect,useState} from "react";
// import useMenu from "../../hooks/UseMenu";


function AdminHome() {
  const [dataState, setDatasState] = useState(null);

  //UseMeu();

  return (
    <main>
    <h1>BACK OFFICE</h1>
    <nav>
      <Link to="/users">Utilisateurs</Link>
      <Link to="/products"><strong>Produits</strong></Link>
      <Link to="/categories">Catégories</Link>
      <Link to="/orders">Commandes</Link>
    </nav>

    </main>
  )
}

export default AdminHome;