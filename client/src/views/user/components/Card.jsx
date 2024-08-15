import PropTypes from "prop-types";

 import { useCart } from "../../../hooks/useCart";
import noPicture from "../../../../../api/public/images/no-picture.jpg";

function Card({ products }){
    const  {addToCart } =useCart();

    return(
      
        <article key={products.id}>
           
           <img 
           src={
             products.src_img
             ?"http://localhost:9000/images/" + products.picture
             :noPicture
           }
           alt = {products.title}
           />
           <h3>{products.title}</h3>
           <p><strong>Prix {products.price} €</strong></p>
           <button id="addTopanier" onClick={() => addToCart(products)}>
             Ajouter au panier
           </button>
        </article>
      
    );

}
Card.proptTypes ={
  products: PropTypes.object.isRequired,
};

export default Card;