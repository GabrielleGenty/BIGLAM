import React, { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useUser } from "../../hooks/UseUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrownOpen } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../Admin/ConfirmationModal"; // Assurez-vous que le chemin est correct

function Cart() {
    const { cart, removeFromCart, clearCart } = useCart();
    const { logout } = useUser();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState("");

    const handleLogout = () => {
        clearCart(); // Vider le panier lors de la déconnexion
        logout(); // Puis déconnecter l'utilisateur
    };

    const handleSubmitOrder = async () => {
        try {
            setIsSubmitting(true);
            const response = await fetch('http://localhost:9000/api/v1/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    totalPrice: cart.reduce((total, item) => total + item.price * item.quantity, 0),
                    status: 'Pending',
                    order_details: cart.map(item => ({
                        quantity: item.quantity,
                        priceEach: item.price,
                        products_id: item.id
                    }))
                }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la soumission de la commande');
            }

            clearCart();
            setConfirmationMessage('Votre commande a été passée avec succès');
            setIsModalOpen(true);
        } catch (error) {
            console.error('Erreur lors de la soumission de la commande:', error);
            setConfirmationMessage('Erreur lors de la soumission de la commande');
            setIsModalOpen(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmModal = () => {
        setIsModalOpen(false);
    };

    if (!cart || cart.length === 0) {
        return (
            <main id="userCart">
                <section id="emptyCart">
                    <h2>Mon Panier</h2>
                    <p>Panier vide <FontAwesomeIcon icon={faFaceFrownOpen} /></p>
                </section>
            </main>
        );
    }

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <main id="userCart">
            <section>
                <h1>Mon Panier</h1>
                {cart.map((item) => (
                    <article key={item.id} className="userCart">
                        <div>
                            {item.picture ? (
                                <img
                                    src={`http://localhost:9000/images/new_collection/${item.picture}`}
                                    alt={item.title}
                                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                                />
                            ) : (
                                <p>Image non disponible</p>
                            )}
                        </div>
                        <div id="article">
                            <p><strong>Label :</strong> {item.title}</p>
                            <p><strong>Quantité :</strong> {item.quantity}</p>
                            <p><strong>Prix Unitaire :</strong> {item.price} €</p>
                            <p><strong>Total :</strong> {item.price * item.quantity} €</p>
                            <button onClick={() => removeFromCart(item.id)}>Supprimer</button>
                        </div>
                    </article>
                ))}
                <h2><strong>Prix Total :</strong> {totalPrice} €</h2>
               
                    <button id="valider-button" onClick={handleSubmitOrder} disabled={isSubmitting}>
                        {isSubmitting ? 'Envoi en cours...' : 'Valider'}
                    </button>
                    {/* <button onClick={handleLogout}>Déconnexion</button> */}
                
                {isModalOpen && (
                    <ConfirmationModal
                        show={isModalOpen}
                        onClose={handleCloseModal}
                        onConfirm={handleConfirmModal}
                        message={confirmationMessage}
                    />
                )}
            </section>
        </main>
    );
}

export default Cart;
