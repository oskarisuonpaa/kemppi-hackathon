import axios from "axios";
import { CSSProperties, useEffect, useState } from "react";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const token = localStorage.getItem("authToken");

interface User {
    username: string;
    name: string;
    role: string;
}

const tableStyle: CSSProperties = {
    borderCollapse: 'collapse',
    width: '80%',
    margin: '20px auto',
};

const thStyle: CSSProperties = {
    border: '2px solid #F57300',
    padding: '10px',
    backgroundColor: '#cccccc',
    color: '#000000',
};

const tdStyle: CSSProperties = {
    border: '2px solid #F57300',
    padding: '10px',
    textAlign: 'center',
};

const AdminPanel = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                
                setUsers(response.data);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        }
        fetchUsersData();
    }, [])

    return (
        <div style={{ textAlign: 'center', margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Users</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>Username</th>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.username}>
                            <td style={tdStyle}>{user.username}</td>
                            <td style={tdStyle}>{user.name}</td>
                            <td style={tdStyle}>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default AdminPanel;