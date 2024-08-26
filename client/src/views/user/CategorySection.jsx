import React, { useEffect, useState } from "react";
import Card from "./components/Card"; 
import { useCart } from "../../hooks/useCart";
import { useLocation } from 'react-router-dom'; 

const API_URL = import.meta.env.VITE_API_URL;

function CategorySection() {
  const { addToCart } = useCart(); 
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation(); 

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(API_URL + '/api/v1/products');
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
        const response = await fetch(API_URL + '/api/v1/categories');
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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryLabel = queryParams.get('category');
    if (categoryLabel) {
      scrollToCategory(categoryLabel);
    }
  }, [location.search]);

  function groupProductsByCategory(products) {
    return products.reduce((acc, product) => {
      if (!acc[product.categories_id]) {
        acc[product.categories_id] = [];
      }
      acc[product.categories_id].push(product);
      return acc;
    }, {});
  }

  function scrollToCategory(categoryLabel) {
    const section = document.querySelector(`h2[data-category-label="${categoryLabel}"]`);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth',
      });
    }
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
    <div> 
      {categories.map((category) => {
        const categoryProducts = productsByCategory[category.id] || [];
        return categoryProducts.length > 0 ? (
          <section key={category.id}>
            <h2 data-category-label={category.label}>Notre Collection {category.label}</h2>
            <div id="categorysection">
              {categoryProducts.map((product) => (
                <Card 
                  key={product.id} 
                  product={product} 
                  onAddToCart={() => addToCart(product)} 
                />
              ))}
            </div>
            <hr />
          </section>
        ) : null;
      })}
    </div>
  );
}

export default CategorySection;
