import { NavLink ,Link } from "react-router-dom";
import Login from "../../auth/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
	faCartShopping,
	faUser,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useUser } from "../../../hooks/UseUser";
import   useMenu   from "../../../hooks/UseMenu";
import { useCart }from "../../../hooks/useCart";


function Header() {
    const { user, setUser } = useUser();
    const { isMenuOpen, toggleMenu } = useMenu();
     
    const { cart } = useCart();
    async function logoutHandler(){
        const response = await fetch(
            "http://localhost:9000/api/v1/users/logout",
            {
            	method: "GET",
            credentials: "include",
        });
        if (response.ok){
            setUser(null);
            // toggleMenu();
        }
    } 
  return (
    <header>
        <nav>
            <NavLink to ={"/"}>Home</NavLink>
            <NavLink to ={"/login"}>Connexion</NavLink>
            <button onClick={logoutHandler}>Déconnexion</button>


        </nav>
    </header>
  )
}

export default Header;