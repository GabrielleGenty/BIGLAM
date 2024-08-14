
import { NavLink ,Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
	faCartShopping,
	faUser,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import logo1 from "../../../assets/images/logo1.png"

import { useUser } from "../../../hooks/UseUser";
import   useMenu   from "../../../hooks/UseMenu";
import { useCart }from "../../../hooks/useCart";


function Header() {
    const { user, logout } = useUser();
    const { isMenuOpen, toggleMenu } = useMenu();
    console.log(user);
    const { cart } = useCart();
    console.log(cart.length);

    // async function logoutHandler(){
    //     const response = await fetch(
    //         "http://localhost:9000/api/v1/users/logout",
    //         {
    //         	method: "GET",
    //         credentials: "include",
    //     });
    //     if (response.ok){
    //         setUser(null);
    //         // toggleMenu();
    //     }
    // } 
  return (
    <header>
        	{isMenuOpen && <div className="overlayOn" onClick={toggleMenu} />}
            <div>
				<button onClick={toggleMenu}>
					<FontAwesomeIcon icon={faBars} />
				</button>
				<h1>
					<Link to={"/"}>
						<img src={logo1} alt="logo BIGLAM moitié d'une collier de perles entour le nom BIGLAM" />
					</Link>
				</h1>
			</div>
            {isMenuOpen && (
				<nav className="burger-menu">
					<button onClick={toggleMenu}>
						<FontAwesomeIcon icon={faXmark} />
					</button>
					<Link to={"/"}>Page d&apos;accueil BIGLAM</Link>
					<hr />

					<Link to={"/"}>En promotion !</Link>

					<Link to={"/"}>Nos meilleures ventes</Link>

					<Link to={"/"}>Nos nouveautés</Link>
					<Link to={"/"}>Nos Coup de coeur</Link>

					{user.isLogged && (
						<>
							<NavLink to={"Dashboard"} className={"bar-nav"}>
								Compte
							</NavLink>
							<button
								onClick={logout}
								className={"bar-nav"}
							>
								Déconnexion
							</button>
						</>
					)}
				</nav>
			)}
            
            <nav>
				{!user.isLogged && (
					<NavLink to={"login"} className={"bar-nav"}>
						Connexion
					</NavLink>
				)}
				{user.isLogged && (
					<>
						<NavLink to={"/dashboard"} className={"bar-nav"}>
							{user.email} <FontAwesomeIcon icon={faUser} />
						</NavLink>
					</>
				)}
				<NavLink to={"cart"} className="cart">
                    <span className="cart-length">{cart.length ? cart.length : null }</span>
					<FontAwesomeIcon icon={faCartShopping} />
				</NavLink>
			</nav>
        <form>
				<input type="search" name="" id="" placeholder="Rechercher un produit"/>
			</form>
    </header>
  )
}

export default Header;