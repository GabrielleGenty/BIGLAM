import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL

function OrderDetails() {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        document.title = `Order Details | ${id}`;
        async function fetchOrderDetails() {
            const response = await fetch(API_URL + `/api/v1/orderDetails/${id}`, {
                credentials: "include",
            });
            if (response.status === 401) {
                console.log("Unauthorized");
                return;
            }
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setOrderDetails(data);
            }
        }
        fetchOrderDetails();
    }, []);
    console.log(orderDetails)
    if (!orderDetails) {
        return (
            <main id="admin">
                <h2>Loading...</h2>
            </main>
        );
    }

    return (
        <main id="admin">
            <section>
                <h1>Détails de la Commande {id}</h1>
                <div id="buttonSet">
                    <button id="retourButton"><Link to="/orders"><strong>Retour aux Commandes</strong></Link></button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th><h3>ID</h3></th>
                            <th><h3>Quantity</h3></th>
                            <th><h3>Price Each</h3></th>
                            <th><h3>Orders ID</h3></th>
                            <th><h3>Products ID</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.map((detail) => {
                            return (
                                <tr key={detail.id}>
                                    <td>{detail.id}</td>
                                    <td>{detail.quantity}</td>
                                    <td>{detail.priceEach} €</td>
                                    <td>{detail.orders_id}</td>
                                    <td>{detail.products_id}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default OrderDetails;