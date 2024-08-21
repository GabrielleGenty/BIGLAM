import React, { useEffect, useState } from "react";
import useMenu from "../../hooks/UseMenu";
import { useUser } from "../../hooks/UseUser";

function Dashboard() {
    useMenu();
    const { user, login } = useUser();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user.isLogged || !user.id) {
                setError("User is not logged in or user ID is missing.");
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:9000/api/v1/orders/user/${user.id}`, {
                    credentials: 'include' // Inclure les cookies de session
                });
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des commandes');
                }
                const data = await response.json();
                setOrders(data.orders || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [user.id, user.isLogged]);

    const handleChangePassword = () => {
        // Implémentez la logique pour modifier le mot de passe
        alert("Modifier le mot de passe");
    };

    const handleUpdateEmail = () => {
        // Implémentez la logique pour modifier l'adresse e-mail
        alert("Modifier l'adresse e-mail");
    };

    if (!user.isLogged) {
        return <p>Please log in to view your dashboard.</p>;
    }

    return (
        <main id="dashboard" className="dashboard">
            <h1>Welcome to Your Account</h1>

            <section id="user" className="profile-info">
                <h2>Your Account</h2>
                <p><strong>Nom:</strong> {user.firstname}</p>
                <p><strong>Prénom:</strong> {user.lastname}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <strong>Account Settings</strong>
                <div id="buttonset">
                    <button id="changePassword" onClick={handleChangePassword}>Change Password</button>
                    <button id="updateEmail" onClick={handleUpdateEmail}>Update Email</button>
                </div>
            </section>

            <section id="userOrder">
                <h2>Your Orders</h2>
                {isLoading ? (
                    <p>Loading orders...</p>
                ) : error ? (
                    <p>Error fetching orders: {error}</p>
                ) : (
                    <ul>
                        {orders.length === 0 ? (
                            <p>No orders found.</p>
                        ) : (
                            orders.map(order => (
                                <li key={order.id}>
                                    Order #{order.id} - Status: {order.status}
                                    <ul>
                                        {order.details.map(detail => (
                                            <li key={detail.product_id}>
                                                Product: {detail.product_name}, Quantity: {detail.quantity}, Price Each: {detail.priceEach} €
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))
                        )}
                    </ul>
                )}
            </section>
        </main>
    );
}

export default Dashboard;
