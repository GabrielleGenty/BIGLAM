import PropTypes from "prop-types";
import { useCart } from "../../../hooks/useCart";
import { Link } from "react-router-dom";
import noPicture from "../../../../../api/public/images/no-picture.jpg";


function Card({ product }) {
  const { addToCart } = useCart();

  return (
    <article key={product.id} id="product">
      <div className="container">
        <Link to={`/product/${product.id}`}><img 
          src={
            `http://localhost:9000/images/${product.picture}`
          }
          alt={product.title}
          onError={(e) => { e.target.src = noPicture; }} // Fallback to noPicture if image fails to load
        />
        </Link>
      </div>
      <div>
        <h3>{product.title}</h3>
        <strong >{product.status}</strong>
        <p><strong>Prix :{product.price} €</strong></p>
        <button role="button"  aria-label="Ajouter au panier" id="addTopanier" onClick={() => addToCart(product)}>
          Ajouter au panier
        </button>
      </div>
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
