import React, { useState, useEffect } from 'react';
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

    const [categories, setCategories] = useState([]);
    const [isCategoryMenuOpen, setCategoryMenuOpen] = useState(false);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('http://localhost:9000/api/v1/categories');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategories(data.response || []);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        }

        fetchCategories();
    }, []);

    const handleLinkClick = () => {
        if (isMenuOpen) {
            toggleMenu();
        }
    };

    const handleCategoryScroll = (id) => {
        const section = document.getElementById(`category-${id}`);
        if (section) {
            window.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth'
            });
        }
        handleLinkClick(); // Ferme le menu burger après le clic
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
                        <Link to={"/promotion"} onClick={handleLinkClick}>En promotion !</Link>
                        <Link to={"/NouvelleCollection"} onClick={handleLinkClick}>Nouvelle collection</Link>
                        <Link onClick={() => setCategoryMenuOpen(!isCategoryMenuOpen)}>
                            Catégories
                        </Link>
                        {isCategoryMenuOpen && (
                            <ul className="category-menu">
                                {categories.map(category => (
                                    <li key={category.id}>
                                        <Link onClick={() => handleCategoryScroll(category.id)}>
                                            {category.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
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
