import { Link } from "react-router-dom";


// import useMenu from "../../hooks/UseMenu";


function AdminHome() {


  //UseMeu();

  return (
    <main>
    <h1>BACK OFFICE</h1>
    <nav>
      <Link to="/users"> <strong>Utilisateurs</strong></Link>
      <Link to="/products"><strong>Produits</strong></Link>
      <Link to="/categories"><strong>Catégories</strong></Link>
      <Link to="/orders"><strong>Commandes</strong></Link>
    </nav>

    </main>
  )
}

export default AdminHome;