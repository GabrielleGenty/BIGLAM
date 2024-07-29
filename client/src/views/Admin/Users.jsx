import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

function Users() {
    const [users, setUsers] = useState(null);
    const [refreshUsersList, setRefreshUsersList] = useState(false);

    useEffect(() => {
        document.title = "Back Office | Utilisateurs";

        async function fetchUsers() {
            const response = await fetch(
                "http://localhost:9000/api/v1/users",
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
            }
        }

        fetchUsers();
    }, [refreshUsersList]);

    if (!users) {
        return (
            <main>
                <h2>Loading...</h2>
            </main>
        );
    }

    return (
        <main id="auth">
            <section>
                <h2>Liste des Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>firstname</th>
                            <th>lastname</th>
                            <th>email</th>
                            <th>createdDate</th>
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
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div>
                    <button><Link to="/">Retour au Home </Link></button></div>
                
            </section>
        </main>
    );
}

export default Users;