import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal"; // Adjust the path if necessary

function Details() {
    const [product, setProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editProduct, setEditProduct] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProduct() {
            if (!id) {
                console.log("Invalid product ID");
                return;
            }
            try {
                const response = await fetch(`http://localhost:9000/api/v1/products/${id}`, {
                    credentials: "include",
                });
                if (response.status === 401) {
                    console.log("Unauthorized");
                    return;
                }
                if (response.ok) {
                    const data = await response.json();
                    console.log(data); // Log the fetched product data
                    setProduct(data); // Set the single product object directly
                    setEditProduct(data); // Initialize editProduct with fetched product data
                } else {
                    console.error("Failed to fetch product:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }
        fetchProduct();
    }, [id]);

    async function deleteHandler() {
        try {
            const response = await fetch(`http://localhost:9000/api/v1/products/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (response.ok) {
                navigate("/products"); // Redirect to products page
            } else {
                console.error("Failed to delete product:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }

    async function updateProductHandler(e) {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9000/api/v1/products/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editProduct),
            });
            if (response.ok) {
                const updatedProduct = await response.json();
                setProduct(updatedProduct); // Set the single product object directly
                setIsEditing(false);
            } else {
                console.error("Failed to update product:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProduct({
            ...editProduct,
            [name]: value,
        });
    };

    if (!product) {
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        );
    }

    return (
        <main>
            <section>
                <h1>Product Details</h1>
                <div id="buttonSet">
                    <button><Link to="/products">Retour à la Page De Produits</Link></button>
                </div>
                {isEditing ? (
                    <form onSubmit={updateProductHandler}>
                        <div>
                            <label>Product Title: </label>
                            <input
                                type="text"
                                name="title"
                                value={editProduct.title || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Product Subtitle: </label>
                            <input
                                type="text"
                                name="subTitle"
                                value={editProduct.subTitle || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Product Description: </label>
                            <input
                                type="text"
                                name="description"
                                value={editProduct.description || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Product Prix: </label>
                            <input
                                type="number"
                                name="price"
                                value={editProduct.price || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Product Référence: </label>
                            <input
                                type="text"
                                name="ref"
                                value={editProduct.ref || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Quantité En stock: </label>
                            <input
                                type="number"
                                name="quantityInStock"
                                value={editProduct.quantityInStock || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Categories ID: </label>
                            <input
                                type="number"
                                name="categories_id"
                                value={editProduct.categories_id || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </form>
                ) : (
                    <article className="productDetails">
                        {product.map((product) => {
                            return(
                        <div className="productDetail" key={product.id}>
                            <div>
                                <h2>Product ID: {product.id}</h2>
                                <h3>Product Title: {product.title}</h3>
                                <p>Product Subtitle: {product.subTitle}</p>
                                <p>Product Description: {product.description}</p>
                                <p>Product Prix: {product.price} €</p>
                                <p>Product Référence: {product.ref}</p>
                                <p>Quantité En stock: {product.quantityInStock}</p>
                                <p>Categories ID: {product.categories_id}</p>
                            </div>
                            <div>
                                <img src={`../../../images/new_collection/${product.picture}`} alt={product.title} />
                            </div>
                        </div>
                        	);
						})}
                    </article>
                )}
                <div id="buttonSet">
                    {!isEditing && (
                        <>
                            <button onClick={() => setIsEditing(true)}>Modifier</button>
                            <button onClick={() => {
                                setDeleteMessage("Are you sure you want to delete this product?");
                                setShowModal(true);
                            }}>Supprimer</button>
                        </>
                    )}
                </div>
            </section>
            <ConfirmationModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={deleteHandler}
                message={deleteMessage}
            />
        </main>
    );
}

export default Details;