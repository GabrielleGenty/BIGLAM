import React from 'react';
import { useParams } from 'react-router-dom';

function CategoryPage() {
    const { id } = useParams();
    // Fetch and display products for the category with id = {id}

    return (
        <div>
            <h1>Category {id}</h1>
            {/* Render products for the category here */}
        </div>
    );
}

export default CategoryPage;