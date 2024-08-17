import { useEffect, useState } from "react";
import Card from "./components/Card";
import Carousel from "../user/components/Carousel.jsx";
import { useCart } from "../../hooks/useCart.jsx";

function Home() {
  const { addToCart } = useCart();
  const images = [
    '/images/new_collection/bague-or-375-jaune-diamants-pierres-precieuses.jpeg',
    '/images/new_collection/bague-argent-925-pierre-synthetique.jpeg',
    '/images/new_collection/bague-or-375-jaune-pierres-fines.jpeg',
    '/images/new_collection/bague-or-375-pierres-fines.jpeg',
    '/images/new_collection/bracelet-acier-dore-aventurines-oranges-19-cm.jpeg',
    '/images/new_collection/bracelet-or-375-jaune-pierres-fines.jpeg',
    '/images/new_collection/boucles-d-oreille-or-375-jaune-pierres-precieuses-et-fines.jpeg',
    '/images/new_collection/boucles-d-oreille-or-375-jaune-saphirs.jpeg',
    '/images/new_collection/boucles-d-oreille-or-375-jaune-saphirs.jpeg',
    '/images/new_collection/collier-or-375-jaune-pierres-fines-45cm.jpeg',
    '/images/new_collection/collier-acier-dore-aventurine-verte-45-cm.jpeg',
  ];

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:9000/api/v1/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data.response || []);
        console.log('All Products:', data); // Debugging line

        // Group products by category
        const groupedByCategory = data.response.reduce((acc, product) => {
          if (!acc[product.categories_id]) {
            acc[product.categories_id] = [];
          }
          acc[product.categories_id].push(product);
          return acc;
        }, {});
        setProductsByCategory(groupedByCategory);

      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:9000/api/v1/categories'); // Ensure this endpoint exists
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data.response || []); // Ensure data.response exists
        console.log('Categories:', data); // Debugging line
      } catch (error) {
        setError(error.message);
      }
    }

    fetchProducts();
    fetchCategories();
  }, []);

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
          <input type="search" name="" id="" placeholder="Rechercher un produit" />
        </form>
      </div>

      <section>
        <h2>Nouvelle Collection</h2>
        <Carousel images={images} />
      </section>

      {categories.map((category) => {
        const categoryProducts = productsByCategory[category.id] || [];
        return categoryProducts.length > 0 ? (
          <section key={category.id} id={`category-${category.id}`} >
            <h2>Notre Collection de {category.label}</h2>
            <div id="categorysection">
              {categoryProducts.map((product) => (
                <Card key={product.id} products={product} />
              ))}
            </div>
          </section>
        ) : null; // Return null if no products in this category
      })}

      <hr />
    </main>
  );
}

export default Home;
