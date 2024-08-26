import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function AddCategory() {
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Utilisé pour la navigation après l'ajout de la catégorie

  async function submitHandler(e) {

    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData); 


    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch(`${API_URL}/api/v1/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

     
      if (!response.ok) {
        const responseParsed = await response.json();
        setError(responseParsed.message || 'Une erreur est survenue.');
        console.error('Erreur de réponse:', responseParsed);
        return;
      }

      // Si la réponse est correcte, traite les données renvoyées
      const responseParsed = await response.json();
      console.log('Réponse de succès:', responseParsed);

      // Redirige vers la page des catégories ou affiche un message de succès
      if (responseParsed.message) {
        navigate('/categories');
      }

    } catch (error) {
      setError('Une erreur inattendue est survenue. Veuillez réessayer plus tard.');
      console.error('Erreur de récupération:', error);
    }
  }

  return (
    <main id="admin">
      <section>
        <h1>Ajouter une Catégorie</h1>
        <div id="buttonSet">
          <button><Link to="/categories">Retour à la Liste des Catégories</Link></button>
        </div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            id="categoryLabel"
            name="label"
            placeholder="Insérer le libellé de la catégorie"
            required
          />
          <div id="buttonSet">
            <button type="submit">Ajouter</button>
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </section>
    </main>
  );
}

export default AddCategory;
