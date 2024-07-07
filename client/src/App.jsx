import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useUser } from './hooks/UseUser';
// import Header from './views/user/partials/Header';
// import Home from './views/user/Home';
// import AdminHome from './views/Admin/AdminHome';
import Login from './views/auth/Login';
// import Products from './views/Admin/Products';
// import Details from './views/Admin/Details';
// import Footer from './views/user/partials/Footer';
import AdminRouter from './router/AdminRouter';
import UserRouter from './router/UserRouter';


function App() {
  const {user, setUser }= useUser(); // Destructure user and setUser from context

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:9000/api/v1/users', {
          credentials: 'include',
        });

        if (response.status === 401) {
          console.log('Unauthorized');
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          console.log(`Server error: ${response.status}`);
        }
      } catch (error) {
        console.log(`Fetch error: ${error.message}`);
      }
    }

    fetchUsers();
  }, [setUser]);

  if (user?.isAdmin) {
    return <AdminRouter />;
    
  } else {
    return <UserRouter/>
  }
}

export default App;