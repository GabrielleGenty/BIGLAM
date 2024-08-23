import PropTypes from "prop-types";
import { useCart } from "../../../hooks/useCart";
import { Link } from "react-router-dom";
import noPicture from "../../../../../api/public/images/no-picture.jpg";


function Card({ products }) {
  const { addToCart } = useCart();

  return (
    <article key={products.id} id="product">
      <div className="container">
        <Link to={`/product/${products.id}`}><img 
          src={
            `http://localhost:9000/images/${products.picture}`
          }
          alt={products.title}
          onError={(e) => { e.target.src = noPicture; }} // Fallback to noPicture if image fails to load
        />
        </Link>
      </div>
      <div>
        <h3>{products.title}</h3>
        <p><strong>Prix :{products.price} €</strong></p>
        <button role="button"  aria-label="Ajouter au panier" id="addTopanier" onClick={() => addToCart(products)}>
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
