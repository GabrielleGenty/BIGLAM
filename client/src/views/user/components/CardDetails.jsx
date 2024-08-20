import PropTypes from "prop-types";
import { useCart } from "../../../hooks/useCart";
import noPicture from "../../../../../api/public/images/no-picture.jpg";

function CardDetails({ product }) {
  const { addToCart } = useCart();

  return (
    <article id="product">
        <h2>{product.title}</h2>
        <div id="productDetails">
       <div className="container">
            <img 
                src={`http://localhost:9000/images/new_collection/${product.picture}`}
                alt={product.title}
                onError={(e) => { e.target.src = noPicture; }} // Fallback to noPicture if image fails to load
            />
      </div>
      <div>
      <p><strong>Produit Référence : </strong> {product.ref}</p>
      <p><strong>Produit artificile   :</strong>{product.subTitle}</p>
      <p><strong>Produit Description : </strong> {product.description}</p>
      <p><strong>Prix : {product.price} €</strong></p>
      <button id="addTopanier" onClick={() => addToCart(product)}>
        Ajouter au panier
      </button>
      </div>
      </div>
    </article>
  );
}

CardDetails.propTypes = {
  product: PropTypes.object.isRequired, // Changement de 'products' à 'product'
};

export default CardDetails;
