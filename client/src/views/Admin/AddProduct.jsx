import React, { useEffect, useState } from 'react';
import { useUser } from "../../hooks/UseUser";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AddProduct() {
  const { setUser } = useUser();
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Assurez-vous d'importer et d'utiliser useNavigate si vous utilisez react-router-dom v6

  useEffect(() => {
    document.title = "Back Office | Ajouter un produit";
    
    async function fetchCategories() {
      try {
        const response = await fetch("http://localhost:9000/api/v1/categories", {
          credentials: "include",
        });
        
        if (response.status === 401) {
          console.log("Unauthorized");
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setCategories(data.response);
        } else {
          console.error("Failed to fetch categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    
    fetchCategories();
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);

    // Envoyer les données au backend
    try {
      const response = await fetch('http://localhost:9000/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        const responseParsed = await response.json();
        setError(responseParsed.message);
        console.log('Error response:', responseParsed);
        return;
      }

      const responseParsed = await response.json();
      console.log('Success response:', responseParsed);
      form.reset();
      setUser(responseParsed.user);
      navigate("/");
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
      console.log('Fetch error:', error);
    }
  };

  return (
    <main id="addProduct">
      <section>
        <h1>Ajouter un produit</h1>
        <div id="buttonSet">
          <button>
            <Link to="/products">Retour à la Page De Produits</Link>
          </button>
        </div>
        {error && <p>{error}</p>}
        <form onSubmit={submitHandler}>
          <input
            type="text"
            id="productTitle"
            name="title"
            placeholder="Insérer Product Title"
            required
          />
          <input
            type="text"
            id="productSubTitle"
            name="subTitle"
            placeholder="Insérer Product SubTitle"
            required
          />
          <input
            type="url"
            id="productPicture"
            name="picture"
            placeholder="Product Picture URL"
          />
          <input
            type="text"
            id="productPictureAlt"
            name="alt"
            placeholder="Picture Description"
            required
          />
          <textarea
            id="productDescription"
            name="description"
            placeholder="Product Description"
            required
          />
          <input
            type="number"
            id="productPrice"
            name="price"
            placeholder="Product Price"
            required
          />
          <input
            type="text"
            id="productRef"
            name="ref"
            placeholder="Product Reference"
            required
          />
          <input
            type="number"
            id="productQuantityInStock"
            name="quantityInStock"
            placeholder="Quantity In Stock"
            required
          />
          <select id="CategoriesId" name="categories_id" required>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
          <div id="buttonSet">
            <button type="submit">Register</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default AddProduct;