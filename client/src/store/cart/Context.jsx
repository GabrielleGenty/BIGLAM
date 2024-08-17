import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const Context = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        // Récupérer le panier depuis le localStorage
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });
    useEffect(() => {
        // Sauvegarder le panier dans le localStorage à chaque modification
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


    function addToCart(product) {
        const productInCart = cart.find((item) => item.id === product.id);
        if (productInCart) {
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
        } else {
            setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
        }
    }

    function removeFromCart(productId) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    }

    function clearCart() {
        setCart([]);
        localStorage.removeItem('cart');
    }

    return (
        <Context.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </Context.Provider>
    );
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { Context, CartProvider };
