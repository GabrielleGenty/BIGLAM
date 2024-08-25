import React, {useState }from 'react';
import {useUser} from "../../hooks/UseUser";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL


function AddCategory() {
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
      const response = await fetch(API_URL + '/api/v1/categories', {
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
    <main id="admin">
      <section>
        <h1>Ajouter un Category</h1>
                  <div id="buttonSet">
                  
                    <button><Link to="/categories">Retour a la Page De Categories</Link></button>
                    </div>
            <form onSubmit={submitHandler}>
                
                  <input
                    type="text"
                    id="categoryLabel "
                    name="label"
                    placeholder="Inserer Category Label"
                    required
                />
           
                    <div id="buttonSet">
                    <button type="submit">Register</button>

                    </div>
                    
                   
                </form>
       
      </section>
    </main>
  )
}

export default AddCategory;