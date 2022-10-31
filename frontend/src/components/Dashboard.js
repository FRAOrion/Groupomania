import React, { useState, useEffect } from 'react';
import apiClient from "../http-common";

const token = localStorage.getItem('token');

const Dashboard = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
        const res = await apiClient.get("/auth", {
            headers: {
                "Authorization" : token,
            }
        });
        const result = {
            data: res.data
        };
        setUsers(result.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteById(id) {
        if (id) {
            try {
                const res = await apiClient.delete(`/auth/${id}`, {
                    headers: {
                        "Authorization": token,
                    }
                });

                const result = {
                    status: res.status + "-" + res.statusText,
                    headers: res.headers,
                    data: res.data
                };
                console.log(result);
                window.location.reload(false);
            } catch (err) {
                console.log(err.response.data.message);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1>Utilisateurs</h1>
            <table className="table table-striped table-hover align-middle">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Supprimer</th>
                    </tr>
                </thead>
                <tbody className='table-group-divider'>
                    {users.map((user) => (
                        <tr key={user.id} >
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td><button className='btn btn-sm btn-outline-danger' onClick={e => deleteById(user.id)}><i className="fa-solid fa-xmark"></i></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default Dashboard;