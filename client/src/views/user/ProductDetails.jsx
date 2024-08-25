import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardDetails from "./components/CardDetails.jsx";
import { useCart } from "../../hooks/useCart.jsx";
const API_URL = import.meta.env.VITE_API_URL

function ProductDetails() {
  const { addToCart } = useCart();
  const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(API_URL + `/api/v1/products`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const text = await response.text(); // Récupère la réponse sous forme de texte

        if (text) {
          const data = JSON.parse(text); // Convertit le texte en JSON
          // Trouve le produit avec l'ID correspondant
          const foundProduct = data.response.find((product) => product.id === parseInt(id));
          setProduct(foundProduct);
        } else {
          throw new Error('Empty response');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main  id="productDetail">
      <section>
        <div className="details">
        <CardDetails product={product} />
        </div>
      </section>
    </main>
  );
}

export default ProductDetails;
