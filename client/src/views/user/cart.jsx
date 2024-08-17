import { useCart } from "../../hooks/useCart";
import { useUser } from "../../hooks/UseUser";

function Cart() {
    const { cart, removeFromCart, clearCart } = useCart();
    const { logout } = useUser();

    const handleLogout = () => {
        clearCart(); // Vider le panier lors de la déconnexion
        logout(); // Puis déconnecter l'utilisateur
    };

    if (!cart || cart.length === 0) {
        return (
            <section id="user">
                <h2>Mon Panier</h2>
                <p>Panier vide</p>
            </section>
        );
    }

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <main>
            <section>
                <h1>Mon Panier</h1>
                {cart.map((item) => (
                    <article key={item.id} className="userCart">
                        <div>
                            {item.picture ? (
                                <img
                                    src={`http://localhost:9000/images/new_collection/${item.picture}`}
                                    alt={item.title}
                                />
                            ) : (
                                <p>Image non disponible</p>
                            )}
                        </div>
                        <div>
                            <p><strong>Identifiant :</strong> {item.id}</p>
                            <h3><strong>Label :</strong> {item.title}</h3>
                            <p><strong>Description :</strong> {item.description}</p>
                            <p><strong>Quantité :</strong> {item.quantity}</p>
                            <p><strong>Prix Unitaire :</strong> {item.price} €</p>
                            <p><strong>Total :</strong> {item.price * item.quantity} €</p>
                            <button onClick={() => removeFromCart(item.id)}>Supprimer</button>
                        </div>
                    </article>
                ))}
                <h3><strong>Prix Total :</strong> {totalPrice} €</h3>
                <button id="valider-button">Valider</button>
                <button onClick={handleLogout}>Déconnexion</button>
            </section>
        </main>
    );
}

export default Cart;
