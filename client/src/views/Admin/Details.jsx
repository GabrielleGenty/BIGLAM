import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal"; // Adjust the path if necessary

function Details() {
    const [product, setProduct] = useState(null);
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
                const response = await fetch(`http://localhost:9000/api/v1/products/${id}`, {
                    credentials: "include",
                });
                if (response.status === 401) {
                    console.log("Unauthorized");
                    return;
                }
                if (response.ok) {
                    const data = await response.json();
                    console.log("DATA:")
                    console.log(data);
                    setProduct(data);
                    
                     // Set the single product object directly
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
        console.log(product); // Log the fetched product data
          // Define the updatedData object using editProduct values
    const updatedData = {
        title: editProduct.title || product.title,
        subTitle: editProduct.subTitle || product.subTitle,
        picture: editProduct.picture || product.picture,
        alt: editProduct.alt || product.alt,
        description: editProduct.description || product.description,
        price: editProduct.price || product.price ,
        ref: editProduct.ref || product.ref,
        quantityInStock: editProduct.quantityInStock || product.quantityInStock,
        categories_id: editProduct.categories_id || product.categories_id,
    };
        try {
            const response = await fetch(`http://localhost:9000/api/v1/products/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData), // Assurez-vous que le corps de la requête est correctement formaté
            });
            if (response.ok) {
                const updatedProduct = await response.json();
                console.log("Updated product data:", updatedProduct);
                setProduct(updatedProduct); // Set the single product object directly
                setIsEditing(false);
                setSuccessMessage("Le produit a été modifié avec succès!"); // Afficher le message de succès
                setTimeout(() => navigate("/products"), 3000); // Rediriger après 3 secondes pour permettre à l'utilisateur de voir le message
            } else {
                console.error("Failed to update product:", response.statusText);
                setSuccessMessage("Échec de la modification du produit. Veuillez réessayer."); // Afficher le message d'erreur
            
            }
        } catch (error) {
            console.error("Error updating product:", error);
            setSuccessMessage("Une erreur est survenue lors de la modification du produit."); // Afficher le message d'erreur
            
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
                    
                       
                       <form onSubmit={updateProductHandler} key={product.id} >
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
                                value={editProduct.subTitle ||product.subTitle}
                                onChange={handleInputChange}

                            />
                             <label>Product Picture : </label>
                              <input
                                type="text"
                                id="productPicture"
                                name="picture"
                                value={editProduct.picture || product.picture}
                                onChange={handleInputChange}
                                
                            />
                             <label>Product Picture Discription (alt): </label>
                                <input
                                  type="text"
                                  id="productPictureAlt"
                                  name="alt"
                                  value={editProduct.alt || product.alt}
                                  onChange={handleInputChange}
                            />
                   
                            <label>Product Description: </label>
                            <input
                                type="text"
                                name="description"
                                value={editProduct.description || product.description}
                                onChange={handleInputChange}
                            />
                            <label>Product Prix: </label>
                            <input
                                type="number"
                                name="price"
                                value={editProduct.price || product.price}
                                onChange={handleInputChange}
                            />
                            <label>Product Référence: </label>
                            <input
                                type="text"
                                name="ref"
                                value={editProduct.ref || product.ref}
                                onChange={handleInputChange}
                            />
                            <label>Quantité En stock: </label>
                            <input
                                type="number"
                                name="quantityInStock"
                                value={editProduct.quantityInStock || product.quantityInStock}
                                onChange={handleInputChange}
                            />
                            <label>Categories ID: </label>
                            <input
                                type="number"
                                name="categories_id"
                                value={editProduct.categories_id || product.categories_id}
                                onChange={handleInputChange}  
                            />
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => {
                            setEditProduct(product);
                            setIsEditing(false);
                        }}>Cancel</button>
         
                    </form>
                            
                   
                ) : (
                    <article className="productDetails">
                    
                        <div className="productDetail" >
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
                    
                    </article>
                )}
                 {successMessage && <div className="successMessage">{successMessage}</div>}
                <div id="buttonSet">
                    {!isEditing &&  (
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