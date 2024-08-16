import PropTypes from "prop-types";
import { useCart } from "../../../hooks/useCart";
import noPicture from "../../../../../api/public/images/no-picture.jpg";


function Card({ products }) {
  const { addToCart } = useCart();

  return (
    <article key={products.id}>
      <img 
        src={
          `http://localhost:9000/images/new_collection/${products.picture}`
        }
        alt={products.title}
        onError={(e) => { e.target.src = noPicture; }} // Fallback to noPicture if image fails to load
      />
      <h3>{products.title}</h3>
      <p><strong>Prix {products.price} €</strong></p>
      <button id="addTopanier" onClick={() => addToCart(products)}>
        Ajouter au panier
      </button>
    </article>
  );
}

Card.propTypes = {
  products: PropTypes.object.isRequired,
};

export default Card;
