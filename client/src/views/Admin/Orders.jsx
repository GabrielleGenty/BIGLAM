import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Orders() {
    const [orders, setOrders] = useState(null);
    const [statuses] = useState(["","En Préparation","En Attente", "Prête à Être Expédiée", "Expédiée", "Livrée" , "Problème de Livraison",  "Retournée",  "Annulée"]);

    useEffect(() => {
        document.title = "Back Office | Commandes";
        async function fetchOrders() {
            const response = await fetch("http://localhost:9000/api/v1/orders", {
                credentials: "include",
            });
            if (response.status === 401) {
                console.log("Unauthorized");
                return;
            }
            if (response.ok) {
                const data = await response.json();
                setOrders(data.response);
            }
        }
        fetchOrders();
    }, []);

    async function updateStatus(orderId, newStatus) {
        try {
            const response = await fetch(`http://localhost:9000/api/v1/orders/${orderId}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (response.ok) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                console.error("Failed to update status:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    }

    if (!orders) {
        return (
            <main id="admin">
                <h2>Loading...</h2>
            </main>
        );
    }

    return (
        <main id="admin">
            <section>
                <h1>Liste des Commandes</h1>
                <div id="buttonSet">
                    <button id="retourButton"><Link to="/"><strong>Retour To Home</strong></Link></button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th><h3>ID</h3></th>
                            <th><h3>OrderedDate</h3></th>
                            <th><h3>Total Price</h3></th>
                            <th><h3>Status </h3></th>
                            <th><h3>Users ID</h3></th>
                            <th><h3>Actions</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.orderedDate}</td>
                                <td>{order.totalPrice} €</td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                    >
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>{order.users_id}</td>
                                <td>
                                    <Link to={"details/" + order.id}>
                                        Détails
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default Orders;