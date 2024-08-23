import React, { useEffect, useState } from 'react';
import { useUser } from "../../hooks/UseUser";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AddProduct() {
  const { setUser } = useUser();
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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

    try {
      const response = await fetch('http://localhost:9000/api/v1/products', {
        method: 'POST',
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const responseParsed = await response.json();
        setError(responseParsed.message || 'Failed to create product');
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
    <main id="admin">
      <section id="addProduct">
        <h1>Ajouter un produit</h1>
        <div id="buttonSet">
          <button>
            <Link to="/products">Retour à la Page De Produits</Link>
          </button>
        </div>
        <form onSubmit={submitHandler}>
          <label htmlFor="title">Product Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Insérer Product Title"
            required
          />
          <label  htmlFor="subTitle">Product SubTitle</label>
          <input
            type="text"
            id="subTitle"
            name="subTitle"
            placeholder="Insérer Product SubTitle"
            required
          />
          <label  htmlFor="status">Product Status</label>
          <input
            type="text"
            id="status"
            name="status"
            placeholder="Insérer Product Status"
           
          />
          <label  htmlFor="image">Product Picture</label>
          <input
            type="file"
            id="image"
            name="picture"
         
          />
             {error && <p style={{color: "red"}}>{error}</p>}
          <label htmlFor="alt">Product Picture Description Alt</label>
          <input
            type="text"
            id="alt"
            name="alt"
            placeholder="Picture Description"
            required
          />
          <label htmlFor="description">Product Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Product Description"
            required
          />
          <label htmlFor="price">Product Price</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Product Price"
            step="0.01" // Allows decimal values
            required
          />
          <label  htmlFor="ref" >Product Ref</label>
          <input
            type="text"
            id="ref"
            name="ref"
            placeholder="Product Reference"
            required
          />
          <label  htmlFor="quantityInStock">Product Quantity In Stock</label>
          <input
            type="number"
            id= "quantityInStock"
            name="quantityInStock"
            placeholder="Quantity In Stock"
            required
          />
          <label>Product Category</label>
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
