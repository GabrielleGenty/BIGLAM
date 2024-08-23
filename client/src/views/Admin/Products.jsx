import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import noPicture from "../../../../api/public/images/no-picture.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all'); // État pour le filtre de statut
  const [refreshProductList, setRefreshProductList] = useState(false);

  useEffect(() => {
    document.title = "Back Office | Produits";
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:9000/api/v1/products", {
          credentials: "include",
        });
        if (response.status === 401) {
          console.log("Unauthorized");
          return;
        }
        if (response.ok) {
          const data = await response.json();
          setProducts(data.response);
          setFilteredProducts(data.response);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    fetchProducts();
  }, [refreshProductList]);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.status && product.status.toLowerCase() === statusFilter.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [statusFilter, products]);

  if (!products.length) {
    return (
      <main id="admin">
        <h2>Loading...</h2>
      </main>
    );
  }

  return (
    <main id="admin">
      <section id="products">
        <h1>Liste des Produits</h1>
        <div id="buttonSet">
          <button id="addButton">
            <Link to="/products/add">
              Ajouter un produit <FontAwesomeIcon icon={faPlus} />
            </Link>
          </button>
          <button id="retourButton">
            <Link to="/">Retour To Home</Link>
          </button>
        </div>
        <div id="filterSet">
          <label htmlFor="statusFilter"> statut :</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tous</option>
            <option value="new">New</option>
            <option value="promotion">Promotion</option>
            <option value="aucun">Aucun</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th><h3>Id</h3></th>
              <th><h3>Image</h3></th>
              <th><h3>Title</h3></th>
              <th><h3>Prix</h3></th>
              <th><h3>Status</h3></th>
              <th><h3>Quantity In Stock</h3></th>
              <th><h3>Actions</h3></th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <div className="container">
                  <img
                    src={`http://localhost:9000/images/${product.picture}`}
                    alt={product.title || 'Product Image'}
                    style={{ maxWidth: '60px', maxHeight: '60px' }}
                    onError={(e) => e.target.src = noPicture} // Image par défaut en cas d'erreur
                  />
                  </div>
                </td>
                <td>{product.title}</td>
                <td>{product.price} €</td>
                <td>{product.status}</td>
                <td>{product.quantityInStock}</td>
                <td>
                  <Link to={"details/" + product.id}>Détails</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default Products;
