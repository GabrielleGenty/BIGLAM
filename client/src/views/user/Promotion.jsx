import React, { useState, useEffect } from "react";
 import Card from "./components/Card";

function Promotion() {
  const [products, setProducts] = useState([]);
  const [promotionProducts, setPromotionProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:9000/api/v1/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log(data);
        setProducts(data.response || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Unable to fetch products.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      // Assurez-vous que la propriété est correcte
      const filteredProducts = products.filter(product => 
        product.status && product.status.toLowerCase() === 'promotion'
      );
      setPromotionProducts(filteredProducts);
    }
  }, [products]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main id="promotion">
      <section>
        <h1>Produits en Promotion</h1>
        {promotionProducts.length > 0 ? (
        <div className="product-container">
            {promotionProducts.map(product => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p>Aucun produit en promotion disponible actuellement.</p>
        )}
      </section>
    </main>
  );
}

export default Promotion;
