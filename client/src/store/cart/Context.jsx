import { createContext, useState} from "react";
import PropTypes from "prop-types";

const Context = createContext();

function CartProvider ({children}){
    const [cart, setCart] = useState([]);
    function addToCart(product) {
        //recherch d'un produit existant dans le panier pour augmenter la quantité
        //si le produit existe dans le panier,on augmente la quantité de 1
        const productInCart = cart.find((item) => item.id ===product.id)
    
        if(productInCart){

            setCart((prevCart) =>
                prevCart.map((item) =>
                  item.id === product.id 
                    ?{...item, quantity: item.quantity +1 }
                    : item
                )
            );
            return;
        }
        setCart((prevCart) => [...prevCart, {id: products.id, quantity:1}]);
    }

    return (
        <Context.Provider value = {{ cart, addToCart }}>
           {children} 
        </Context.Provider>
    );
}
CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export {Context, CartProvider };