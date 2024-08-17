
import { NavLink ,Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
	faCartShopping,
	faUser,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import logo4 from "../../../assets/images/logo4.png"

import { useUser } from "../../../hooks/UseUser";
import   useMenu   from "../../../hooks/UseMenu";
import { useCart }from "../../../hooks/useCart";


function Header() {
    const { user, logout } = useUser();
    const { isMenuOpen, toggleMenu } = useMenu();
    console.log(user);
    const { cart } = useCart();
    console.log(cart.length);


  return (
    <header>
        	
            <div>
				
					<Link to={"/"}>
						<img src={logo4} alt="logo BIGLAM moitié d'une collier de perles entour le nom BIGLAM" />
					</Link>
			</div>
			<div>
			
            {isMenuOpen && (
				<nav className="burger-menu">
					<button onClick={toggleMenu}>
						<FontAwesomeIcon icon={faXmark} />
					</button>
					<Link to={"/"}>Page d&apos;accueil BIGLAM</Link>
					<Link to={"/"}>En promotion !</Link>
					<Link to={"/"}>Nos meilleures ventes</Link>
					<Link to={"/"}>Nos nouveautés</Link>
					<Link to={"/"}>Nos Coup de coeur</Link>

					{user.isLogged && (
						<>
							<NavLink to={"Dashboard"} >
								Compte
							</NavLink>
							<button
								onClick={logout}
							>
								Déconnexion
							</button>
						</>
					)}
					{isMenuOpen && <div className="overlayOn" onClick={toggleMenu} />}
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
						 <div >
							<FontAwesomeIcon icon={faUser} className="userIcon"/>
							<span>{user.email} </span>
							</div>
							
						</NavLink>
					</>
				)}
				<NavLink to={"cart"} className="cart">
                    <span className="cart-length">{cart.length ? cart.length : null }</span>
					<FontAwesomeIcon icon={faCartShopping} />
				</NavLink>
				<button onClick={toggleMenu}>
					<FontAwesomeIcon icon={faBars} />
				</button>
			</nav>
			</div>
			
		
    </header>
  )
}

export default Header;