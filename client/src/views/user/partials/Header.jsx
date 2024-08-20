import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import logo4 from "../../../assets/images/logo4.png";

import { useUser } from "../../../hooks/UseUser";
import useMenu from "../../../hooks/UseMenu";
import { useCart } from "../../../hooks/useCart";

function Header() {
    const { user, logout } = useUser();
    const { isMenuOpen, toggleMenu } = useMenu();
    const { cart } = useCart();

    // Fonction pour fermer le menu burger
    const handleLinkClick = () => {
        if (isMenuOpen) {
            toggleMenu();
        }
    };

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
                        <Link to={"/"} onClick={handleLinkClick}>Page d&apos;accueil BIGLAM</Link>
                        <Link to={"/aboutUs"} onClick={handleLinkClick}>About us</Link>
                        <Link to={"/enPromotion"} onClick={handleLinkClick}>En promotion !</Link>
                        <Link to={"/NouvelleCollection"} onClick={handleLinkClick}>Nouvelle collection</Link>
                        <Link to={"/NouvelleCollection"} onClick={handleLinkClick}>Nouvelle collection</Link>
                        {user.isLogged && (
                            <>
                                <NavLink to={"Dashboard"} onClick={handleLinkClick}>
                                    Mon Compte
                                </NavLink>
                                <button onClick={() => { logout(); handleLinkClick(); }}>
                                    Déconnexion
                                </button>
                            </>
                        )}
                        {isMenuOpen && <div className="overlayOn" onClick={toggleMenu} />}
                    </nav>
                )}
                <nav>
                    {!user.isLogged && (
                        <div>
                            <NavLink to={"login"} className={"bar-nav"}>
                                Connexion
                            </NavLink>
                        </div>
                    )}
                    {user.isLogged && (
                        <>
                            <NavLink to={"/dashboard"} className={"bar-nav"}>
                                <FontAwesomeIcon icon={faUser} className="userIcon" />
                                {user.email}
                            </NavLink>
                        </>
                    )}
                    <NavLink to={"cart"} className="cart">
                        <span className="cart-length">{cart.length ? cart.length : null}</span>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </NavLink>
                    <button onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header;
