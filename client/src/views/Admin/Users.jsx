import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL

function Users() {
    const [users, setUsers] = useState(0);

    useEffect(() => {
        document.title = "Back Office | Utilisateurs";

        async function fetchUsers() {
            try{ 
            const response = await fetch(
                API_URL + "/api/v1/users/getAll",
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
                setUsers(data.response);
                console.log(data);
            } else{
                console.error("Failed to fetch users");
            } 
        } catch {
          console.error("Error fetching users :",error)
        }
    }

        fetchUsers();
    }, []);

    if (!users) {
        return (
            <main id="admin">
                <h2>Loading...</h2>
            </main>
        );
    }

    return (
        <main id="admin">
            <section>
                <h1>Liste des Users</h1>
                <div id="buttonSet">
                    <button><Link to="/">Retour au Home </Link></button>
                    
                    </div>

                    {users.length === 0 ? (
                       <p>No users found</p>
                     ) :(  
                      <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>E-mail</th>
                                <th>CreatedDate</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                           {users.map((user) => {
                              return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.createdDate}</td>
                                    <td><Link to={"details/" }>
                                        Détails
                                    </Link>
                                    </td>
                                </tr>
                                );
                              })}
                            </tbody>
                    
                        </table>

                    )}
            </section>
        </main>
    );
}

export default Users;