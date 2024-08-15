import { UseCheckUser } from "../../hooks/UseCheckUser"
import useMenu from "../../hooks/UseMenu";


function Dashboard() {
    useMenu();
    const [ user ] = UseCheckUser();

    if(user.isLogged) {
        return (
          <main  className="dashboard">
        
          <h1>Welcome to Your Account</h1>
          
          <section className="profile-info">
            <h2>Your Profile</h2>
            <p>Name: John Doe</p>
            <p>Email: john.doe@example.com</p>
          </section>
    
          <section className="orders">
            <h2>Your Orders</h2>
            <ul>
              <li>Order #12345 - Status: Shipped</li>
              <li>Order #12346 - Status: Processing</li>
              <li>Order #12347 - Status: Delivered</li>
            </ul>
          </section>
    
          <section className="settings">
            <h2>Account Settings</h2>
            <button>Change Password</button>
            <button>Update Email</button>
          </section>
          </main>
        ) 
    }

}

export default Dashboard;