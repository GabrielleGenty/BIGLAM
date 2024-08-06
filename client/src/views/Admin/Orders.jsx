import React from "react";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";


function Orders() {
    const [orders, setOrders] = useState(null);
  
    
  useEffect(() => {
    document.title = "Back Office | Commandes";
    async function fetchOrders() {
        const response = await fetch(
            "http://localhost:9000/api/v1/orders",
            {
                credentials: "include",
            }
        );
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

if (!orders) {
    return (
        <main>
            <h2>Loading...</h2>
        </main>
    );
}
  
    return (
        
        <main >
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
                      
                    
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => {
                        return (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.orderedDate}</td>
                                <td>{order.totalPrice} €</td>
                                <td>{order.status}</td>
                                <td>{order.users_id}</td>
                                <td>
                                    <Link to={"details/" + order.id}>
                                        Détails
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        
        </section>
    </main>
  );
}

export default Orders;