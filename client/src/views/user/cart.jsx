import { useCart } from "../../hooks/useCart";

function Cart() {
    const { cart } = useCart();

    if (!cart || !cart.length) {
        return (
            <section>
                <h2>Cart SOON</h2>
                <p>Panier vide</p>
            </section>
        );
    }

    // Optionnel: Calculer le prix total
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <section>
            <h2>Mon Panier</h2>
            {cart.map((item) => (
                <article key={item.id}>
                    <p>Identifiant : {item.id}</p>
                    <h3>Label : {item.title}</h3>
                    <p>Description : {item.description}</p>
                    <p>Quantité : {item.quantity}</p>
                    <p>Prix Unitaire : {item.price} €</p>
                    <p>Total : {item.price * item.quantity} €</p>
                    {/* Ajout d'une image si nécessaire */}
                    {item.src_img && (
                        <img
                            src={`http://localhost:9000/images/${item.src_img}`}
                            alt={item.title}
                            style={{ width: "100px", height: "100px" }}
                        />
                    )}
                    {/* Optionnel: Ajouter un bouton pour supprimer un article */}
                    {/* <button onClick={() => removeFromCart(item.id)}>Supprimer</button> */}
                </article>
            ))}
            {/* Affichage du prix total */}
            <h3>Prix Total : {totalPrice} €</h3>
        </section>
    );
}

export default Cart;
