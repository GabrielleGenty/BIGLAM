import React, { useEffect, useState } from "react";
import Carousel from "../user/components/Carousel.jsx";
import CategorySection from "./CategorySection.jsx";
import TableauDeTailles from "../user/TableauDeTailles.jsx";

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(API_URL + '/api/v1/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data.response || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Extract image URLs and IDs for the carousel
  const carouselImages = products.map(product => API_URL + `/images/${product.picture}`);
  const productIds = products.map(product => product.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main id="userHome">
      <section id="carousel">
        <h2>Notre Collection</h2>
        <Carousel images={carouselImages} productIds={productIds} />
      </section>
      <hr />
      <CategorySection />
      <section id="taille">
        <h2>Tableau de tailles des Bagues</h2>
        <TableauDeTailles />
      </section>
      <hr />
    </main>
  );
}

export default Home;
