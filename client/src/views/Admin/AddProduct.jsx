import React, {useState }from 'react';
import {useUser} from "../../hooks/UseUser";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const{setUser}= useUser();
  const [error , setError] = useState(null);
  const navigate = useNavigate(); // Assurez-vous d'importer et d'utiliser useNavigate si vous utilisez react-router-dom v6

  async function submitHandler(e){
    e.preventDefault();
        const form = e.target;
        const formData =new FormData(form);
        const data = Object.fromEntries(formData);
        console.log(data);
     // Envoyer les données au backend

     try{
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
        console.log('Error response:', responseParsed); // Log the error response
        return;
      }
      console.log("Avant parse");
      const responseParsed = await response.json();
      console.log(responseParsed);
      console.log('Success response:', responseParsed); // Log the success response
      form.reset();
      setUser(responseParsed.user);
      navigate("/");
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
      console.log('Fetch error:', error); // Log the fetch error
    }
  };

  return (
    <main id="addProduct">
      <section>
        <h1>Ajouter un produit</h1>
      
            {error && <p>{error}</p>}
            {/* <div className="AddFormTitle">
                  <h3>Product Title</h3>
                  <h3>Product SubTitle</h3>
                  <h3>Product picture </h3>
                  <h3>Product picture alt </h3>
                  <h3>Product Description </h3>
                  <h3>Product price </h3>
                  <h3>Product Reference</h3>
                  <h3>Quantity In Stock</h3>
                  <h3>Categories ID</h3>
            </div> */}

            <form onSubmit={submitHandler}>
                
                  <input
                    type="text"
                    id="productTitle "
                    name="title"
                    placeholder="Inserer Product Title"
                    required
                />
                <input
                    type="text"
                    id="productSubTitle "
                    name="subTitle"
                    placeholder="Inserer Product SubTitle"
                    required
                />
                <input
                    type="url"
                    id="productPicture"
                    name="picture"
                    placeholder=" Product Picture URL"
              
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
                <input
                    type="number"
                    id="CategoriesId"
                    name="categories_id"
                    placeholder="Category ID"
                    required
                />
                    
                    <button type="submit">Register</button>
                </form>
       
      </section>
    </main>
  )
}

export default AddProduct;