import PropTypes from "prop-types";
import { useCart } from "../../../hooks/useCart";
import { Link } from "react-router-dom";
import noPicture from "../../../../../api/public/images/no-picture.jpg";


function Card({ products }) {
  const { addToCart } = useCart();

  return (
    <article key={products.id} id="product">
      <Link to={`/product/${products.id}`}><img 
        src={
          `http://localhost:9000/images/new_collection/${products.picture}`
        }
        alt={products.title}
        onError={(e) => { e.target.src = noPicture; }} // Fallback to noPicture if image fails to load
      /></Link>
      <h3>{products.title}</h3>
      <p><strong>Prix {products.price} €</strong></p>
      <button id="addTopanier" onClick={() => addToCart(products)}>
        Ajouter au panier
      </button>
    </article>
  );
}

Card.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
