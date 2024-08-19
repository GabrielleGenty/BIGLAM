import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import Carousel from "../user/components/Carousel.jsx";
import { useCart } from "../../hooks/useCart.jsx";

function Home() {
  const { addToCart } = useCart();
  const images = [
    '/images/new_collection/bague-or-375-jaune-diamants-pierres-precieuses.jpeg',
    // ... other images
  ];

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:9000/api/v1/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data.response || []);
        setProductsByCategory(groupProductsByCategory(data.response));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:9000/api/v1/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data.response || []);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchProducts();
    fetchCategories();
  }, []);

  function groupProductsByCategory(products) {
    return products.reduce((acc, product) => {
      if (!acc[product.categories_id]) {
        acc[product.categories_id] = [];
      }
      acc[product.categories_id].push(product);
      return acc;
    }, {});
  }

  function handleSearchInputChange(e) {
    const query = e.target.value;
    setSearchInput(query);

    if (query.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter(product =>
        product.title && product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }

  function handleProductClick(productName) {
    setSearchInput(productName);
    setFilteredProducts([]);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(products) || !Array.isArray(categories)) {
    return <div>Data format is incorrect.</div>;
  }

  return (
    <main id="userHome">
      <div>
        <form>
          <input
            type="search"
            placeholder="Rechercher un produit"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          {filteredProducts.length > 0 && (
            <ul className="suggestion-list">
              {filteredProducts.map(product => (
                <li
                  key={product.id}
                  onClick={() => handleProductClick(product.title)}
                >
                  {product.title}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>

      <section>
        <h2>Nouvelle Collection</h2>
        <Carousel images={images} />
      </section>

      {searchInput && filteredProducts.length > 0 && (
        <section>
          <h2>Produits trouvés</h2>
          <div id="categorysection">
            {filteredProducts.map(product => (
              <Card key={product.id} products={product} />
            ))}
          </div>
        </section>
      )}

      {categories.map((category) => {
        const categoryProducts = productsByCategory[category.id] || [];
        return categoryProducts.length > 0 ? (
          <section key={category.id} id={`category-${category.id}`}>
            <h2>Notre Collection de {category.label}</h2>
            <div id="categorysection">
              {categoryProducts.map((product) => (
                <Card key={product.id} products={product} />
              ))}
            </div>
          </section>
        ) : null;
      })}

      <hr />
    </main>
  );
}

export default Home;
