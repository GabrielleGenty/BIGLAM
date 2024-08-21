import React, { useState } from 'react';

function SearchInput({ products, onProductClick, onCloseSuggestions }) {
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  function handleSearchInputChange(e) {
    const query = e.target.value;
    setSearchInput(query);

    if (query.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter(product =>
        product.title && product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }

  function handleProductClick(id) {
    if (onProductClick) onProductClick(id);
    setSearchInput("");
    setFilteredProducts([]);
    if (onCloseSuggestions) onCloseSuggestions(); // Close suggestions list
  }

  return (
    <div>
      <form>
        <input
          type="search"
          placeholder="Rechercher un produit"
          aria-label="Rechercher un produit"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        {filteredProducts.length > 0 && (
          <ul className="suggestion-list">
            {filteredProducts.map(product => (
              <li
                className="listItem"
                key={product.id}
                onClick={() => handleProductClick(product.id)}
              >
                {product.title}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}

export default SearchInput;
