import React, { useEffect, useState } from "react";
import useMenu from "../../hooks/UseMenu";
import { useUser } from "../../hooks/UseUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {faGear }from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
    useMenu();
    const { user } = useUser();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user.isLogged || !user.email) {
                setError("User is not logged in or email is missing.");
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:9000/api/v1/orders/user/${user.email}`, {
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
    }, [user.email, user.isLogged]);

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
        <main id="dashboard">

            <section id="user" className="profile-info">
                <h2>votre compte</h2>
                <p><strong>Nom:</strong> {user.firstname}</p>
                <p><strong>Prénom:</strong> {user.lastname}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <Link to="/"><FontAwesomeIcon icon={faGear} />
                Gérer votre compt
                 </Link>
            </section>

            <section id="userOrder">
                <h2>vos commandes</h2>
                {isLoading ? (
                    <p>Loading orders...</p>
                ) : error ? (
                    <p>Error fetching orders: {error}</p>
                ) : (
                    <div>
                        {orders.length === 0 ? (
                            <p>No orders found.</p>
                        ) : (
                            orders.map(order => (
                                <div key={order.id}>
                                    <strong>Order{order.id} - Status: {order.status}</strong>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Quantity</th>
                                                <th>Price Each</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.details.map(detail => (
                                                <tr key={`${order.id}-${detail.product_id}`}>
                                                    <td>
                                                        <img 
                                                            src={`http://localhost:9000/images/new_collection/${detail.product_img}`}
                                                            alt={detail.product_name || 'Product Image'} 
                                                            style={{ maxWidth: '60px', maxHeight: '60px' }}
                                                        />
                                                    </td>
                                                    <td>{detail.product_name}</td>
                                                    <td>{detail.quantity}</td>
                                                    <td>{detail.priceEach} €</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Dashboard;
