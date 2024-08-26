import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal"; // Assurez-vous que le chemin est correct
const API_URL = import.meta.env.VITE_API_URL

function Details() {
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editProduct, setEditProduct] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProduct() {
            if (!id) {
                console.log("Invalid product ID");
                return;
            }
            try {
                const response = await fetch(API_URL + `/api/v1/products/${id}`, {
                    credentials: "include",
                });
                if (response.status === 401) {
                    console.log("Unauthorized");
                    return;
                }
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                    setEditProduct(data); // Initialize editProduct with fetched product data
                } else {
                    console.error("Failed to fetch product:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }

        async function fetchCategories() {
            try {
                const response = await fetch(API_URL + "/api/v1/categories", {
                    credentials: "include",
                });
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

        fetchProduct();
        fetchCategories();
    }, [id]);

    async function deleteHandler() {
        try {
            const response = await fetch(API_URL + `/api/v1/products/${id}`, {
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

        const updatedData = {
            title: editProduct.title || product.title,
            subTitle: editProduct.subTitle || product.subTitle,
            status: editProduct.status || product.status,
            picture: editProduct.picture || product.picture,
            alt: editProduct.alt || product.alt,
            description: editProduct.description || product.description,
            price: editProduct.price || product.price,
            ref: editProduct.ref || product.ref,
            quantityInStock: editProduct.quantityInStock || product.quantityInStock,
            categories_id: editProduct.categories_id || product.categories_id,
        };

        try {
            const response = await fetch(API_URL + `/api/v1/products/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            if (response.ok) {
                const updatedProduct = await response.json();
                setProduct(updatedProduct);
                setIsEditing(false);
                setSuccessMessage("Le produit a été modifié avec succès!");

                // Afficher le message de succès pendant quelques secondes
                setTimeout(() => {
                    setSuccessMessage("");
                    navigate("/products"); // Redirect to products page after a short delay
                }, 5000);
            } else {
                console.error("Failed to update product:", response.statusText);
                setSuccessMessage("Échec de la modification du produit. Veuillez réessayer.");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            setSuccessMessage("Une erreur est survenue lors de la modification du produit.");
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
            <main id="admin">
                <h1>Loading...</h1>
            </main>
        );
    }

    return (
        <main id="admin">
            <section>
                <h1>Product Details</h1>
                <div id="buttonSet">
                    <button><Link to="/products">Retour à la Page De Produits</Link></button>
                </div>
                {isEditing ? (
                    <form onSubmit={updateProductHandler} key={product.id}>
                        <label>Product Title: </label>
                        <input
                            type="text"
                            name="title"
                            value={editProduct.title || product.title}
                            onChange={handleInputChange}
                        />
                        <label>Product Subtitle: </label>
                        <input
                            type="text"
                            name="subTitle"
                            value={editProduct.subTitle || product.subTitle}
                            onChange={handleInputChange}
                        />
                        <label>Product Status: </label>
                        <input
                            type="text"
                            name="status"
                            value={editProduct.status || product.status}
                            onChange={handleInputChange}
                        />
                        <label>Product Picture : </label>
                        <input
                            type="text"
                            name="picture"
                            value={editProduct.picture || product.picture}
                            onChange={handleInputChange}
                        />
                        <label>Product Picture Description (alt): </label>
                        <input
                            type="text"
                            name="alt"
                            value={editProduct.alt || product.alt}
                            onChange={handleInputChange}
                        />
                        <label>Product Description: </label>
                        <textarea
                            name="description"
                            value={editProduct.description || product.description}
                            onChange={handleInputChange}
                        />
                        <label>Product Price: </label>
                        <input
                            type="number"
                            name="price"
                            value={editProduct.price || product.price}
                            onChange={handleInputChange}
                            step="0.01"
                        />
                        <label>Product Reference: </label>
                        <input
                            type="text"
                            name="ref"
                            value={editProduct.ref || product.ref}
                            onChange={handleInputChange}
                        />
                        <label>Quantity In Stock: </label>
                        <input
                            type="number"
                            name="quantityInStock"
                            value={editProduct.quantityInStock || product.quantityInStock}
                            onChange={handleInputChange}
                        />
                        <label>Product Category</label>
                        <select
                            name="categories_id"
                            value={editProduct.categories_id || product.categories_id}
                            onChange={handleInputChange}
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.label}
                                </option>
                            ))}
                        </select>
                        <div id="buttonSet">
                            <button type="submit">Save</button>
                            <button
                                type="button"
                                onClick={() => {
                                    setEditProduct(product);
                                    setIsEditing(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <article className="productDetails">
                        <div className="container">
                            <img 
                                src={API_URL + `/images/${product.picture}`}
                                alt={product.alt || 'Product image'} 
                            />
                        </div>
                        <div>
                            <h2>Product ID: {product.id}</h2>
                            <h3>Product Title: {product.title}</h3>
                            <p>Product Subtitle: {product.subTitle}</p>
                            <p>Product Status: {product.status}</p>
                            <p>Product Description: {product.description}</p>
                            <p>Product Price: {product.price} €</p>
                            <p>Product Reference: {product.ref}</p>
                            <p>Quantity In Stock: {product.quantityInStock}</p>
                            <p>Category: {categories.find(c => c.id === product.categories_id)?.label}</p>
                        </div>
                    </article>
                )}
                {successMessage && <div className="successMessage">{successMessage}</div>}
                {!isEditing && (
                    <div id="buttonSet">
                        <button onClick={() => setIsEditing(true)}>Modifier</button>
                        <button
                            onClick={() => {
                                setDeleteMessage("Are you sure you want to delete this product?");
                                setShowModal(true);
                            }}
                        >
                            Supprimer
                        </button>
                    </div>
                )}
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
