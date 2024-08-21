import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Card from "./components/Card";
import Carousel from "../user/components/Carousel.jsx";
import { useCart } from "../../hooks/useCart.jsx";

function Home() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook pour la navigation

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

  function handleProductClick(id) {
    navigate(`/product/${id}`);
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

  // Construct image URLs and IDs for the carousel
  const carouselImages = [
    ...products.map(product => `http://localhost:9000/images/new_collection/${product.picture}`)
  ];

  const productIds = products.map(product => product.id);

  return (
    <main id="userHome">
      <section id="carousel">
        <h2>Notre Collection</h2>
        <Carousel images={carouselImages} productIds={productIds} />
      </section>
      {categories.map((category) => {
        const categoryProducts = productsByCategory[category.id] || [];
        return categoryProducts.length > 0 ? (
          <section key={category.id} id={`category-${category.id}`}>
            <h2>Notre Collection {category.label}</h2>
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
