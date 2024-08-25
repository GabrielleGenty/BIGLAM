import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import logo4 from "../../../assets/images/logo4.png";
import { useUser } from "../../../hooks/UseUser";
import useMenu from "../../../hooks/UseMenu";
import { useCart } from "../../../hooks/useCart";
import SearchInput from "../partials/SearchInput";
import NewMenu from "./NewMenu"; // Importer Menu pour les autres usages

const API_URL = import.meta.env.VITE_API_URL;

function Header() {
    const { user, logout } = useUser();
    const { isMenuOpen, toggleMenu } = useMenu();
    const { cart } = useCart();
    const navigate = useNavigate(); // Initialiser useNavigate

    const [products, setProducts] = useState([]);
    const [isSuggestionsOpen, setSuggestionsOpen] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(API_URL + '/api/v1/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data.response || []);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        }

        fetchProducts();
    }, []);

    function handleProductClick(id) {
        navigate(`/product/${id}`);
        setSuggestionsOpen(false); // Fermer la liste des suggestions
    }

    function handleCloseSuggestions() {
        setSuggestionsOpen(false); // Fermer la liste des suggestions
    }

    return (
        <header>
            <div id="headerNav">
                <div className="container">
                    <Link to={"/"}>
                        <img src={logo4} alt="logo BIGLAM moitié d'une collier de perles entour le nom BIGLAM" />
                    </Link>
                </div>
                <div className='leftNav'>
             
                    {/* Menu Burger */}
                    {isMenuOpen && (
                        <nav className="burger-menu">
                            <button onClick={toggleMenu} >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                            <Link to={"/"} onClick={toggleMenu}>Page d'accueil BIGLAM</Link>
                            <Link to={"/aboutUs"} onClick={toggleMenu}>À propos de nous</Link>
                            <Link to={"/promotion"} onClick={toggleMenu}>En promotion !</Link>
                            <Link to={"/newCollection"} onClick={toggleMenu}>Nouvelle collection</Link>
                            {/* Suppression de la section Catégories */}
                            {user.isLogged && (
                                <div className="account">
                                    <NavLink to="/dashboard" onClick={toggleMenu}>
                                        Mon Compte
                                    </NavLink>
                                    <button onClick={() => { logout(); toggleMenu(); }}>
                                        Déconnexion
                                    </button>
                                </div>
                            )}
                            {isMenuOpen && <div className="overlayOn" onClick={toggleMenu} />}
                        </nav>
                    )}
                 
                    <nav className='iconNav'>
                        {!user.isLogged && (
                            <div>
                                <NavLink to={"login"} className={"bar-nav"}>
                                    Connexion
                                </NavLink>
                            </div>
                        )}
                        {user.isLogged && (
                            <div>
                                <NavLink to={"/dashboard"} className={"bar-nav"}>
                                    <FontAwesomeIcon icon={faUser} className="userIcon" />
                                    <span>Bonjour,{user.firstname}</span>
                                </NavLink>
                            </div>
                        )}
                
                        <div>
                            <NavLink to={"cart"} className="cart">
                                <span className="cart-length">{cart.length ? cart.length : null}</span>
                                <FontAwesomeIcon icon={faCartShopping} />
                            </NavLink>
                        </div>
                        <button onClick={toggleMenu} id='burger-menu-button'> 
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </nav>
                    <div className='menu'>
                        <NewMenu />
                    </div>
                </div>
            </div>
        
            <div>
                <SearchInput
                    products={products}
                    onProductClick={handleProductClick}
                    onCloseSuggestions={handleCloseSuggestions} // Passer la fonction de rappel
                />
            </div>
        </header>
    );
}

export default Header;
