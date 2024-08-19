import useMenu from "../../hooks/UseMenu";
import { useUser } from "../../hooks/UseUser";

function Dashboard() {
    useMenu();
    const { user,login } = useUser();
    console.log();

    if (user.isLogged) {
        return (
            <main className="dashboard">
                <h1>Welcome to Your Account</h1>
                
                <section id="user" className="profile-info">
                    <h2>Your Account</h2>
                    <p> Nom: {user.firstname}</p>
                    <p>Prénom : {user.lastname}</p>
                    <p>Email: {user.email}</p>
                    <strong>Account Settings</strong>
                    <div id="buttonset">
                        <button>Change Password</button>
                        <button>Update Email</button>
                    </div>
                </section>
                
                <section id="userOrder" >
                    <h2>Your Orders</h2>
                    <ul>
                        <li>Order #12345 - Status: Shipped</li>
                        <li>Order #12346 - Status: Processing</li>
                        <li>Order #12347 - Status: Delivered</li>
                    </ul>
                </section>
            </main>
        );
    } else {
        return <p>Please log in to view your dashboard.</p>;
    }
}

export default Dashboard;
