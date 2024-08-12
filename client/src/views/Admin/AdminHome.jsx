import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminHome() {
  const [selectedCategory, setSelectedCategory] = useState("users");
  const [searchId, setSearchId] = useState("");
  const [result, setResult] = useState(null);

  async function handleSearch() {
    if (!searchId) return;

    try {
      const response = await fetch(`http://localhost:9000/api/v1/${selectedCategory}/${searchId}`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        setResult({ error: `No ${selectedCategory.slice(0, -1)} found with ID ${searchId}` });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult({ error: "An error occurred while fetching data." });
    }
  }

  return (
    <main>
      <section>
        <h1>BACK OFFICE</h1>
        <nav>
          <Link to="/users"><strong>Utilisateurs</strong></Link>
          <Link to="/products"><strong>Produits</strong></Link>
          <Link to="/categories"><strong>Catégories</strong></Link>
          <Link to="/orders"><strong>Commandes</strong></Link>
        </nav>

        <div className="adminHomeRecherche">
         
          <label htmlFor="categorySelect">Search in: </label>
          <select
            id="categorySelect"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option >....</option>
            <option value="products">Produits</option>
            <option value="categories">Catégories</option>
            <option value="orders">Commandes</option>
          </select>
   
          <label htmlFor="searchId" >ID: </label>
          <input 
            type="text"
            id="searchId"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        
         
          <button onClick={handleSearch}>
            Rechercher
          </button>
          
        </div>
        

        {result && (
          <div style={{ marginTop: "20px" }}>
            {result.error ? (
          
              <div>{result.error}</div>
            
            ) : (
              <pre>{JSON.stringify(result, null, 2)}</pre>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default AdminHome;
