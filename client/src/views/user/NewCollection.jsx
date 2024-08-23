import React, { useState, useEffect } from "react";
import Card from "./components/Card";

function NewCollection() {
  const [products, setProducts] = useState([]);
  const [newCollectionProducts, setNewCollectionProducts] = useState([]);
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
        console.log(data); // Vérifiez la structure des données dans la console
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
      // Assurez-vous que 'new' est la valeur correcte pour les nouveaux produits
      const filteredProducts = products.filter(product =>
        product.status && product.status.toLowerCase() === 'new'
      );
      setNewCollectionProducts(filteredProducts);
    }
  }, [products]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main id="new-collection">
      <section>
        <h1>Nouvelle Collection</h1>
        {newCollectionProducts.length > 0 ? (
          <div className="product-container">
            {newCollectionProducts.map(product => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div>Aucun produit dans la nouvelle collection.</div>
        )}
      </section>
    </main>
  );
}

export default NewCollection;
