import axios from "axios";
import { CSSProperties, useEffect, useState } from "react";
import UserManager from "./userManagement/userManager";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const token = localStorage.getItem("authToken");

interface User {
    username: string;
    name: string;
    role: string;
    group: string[];
    id: string;
}

const tableStyle: CSSProperties = {
    // borderCollapse: 'collapse',
    // width: '80%',
    // margin: '20px auto',
};

const thStyle: CSSProperties = {
    // border: '2px solid #F57300',
    // padding: '10px',
    // backgroundColor: '#cccccc',
    // color: '#000000',
};

const tdStyle: CSSProperties = {
    // border: '2px solid #F57300',
    // padding: '10px',
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

                setUsers(response.data);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        }
        fetchUsersData();
    }, [])

    return (
        <div className="container">
            <div className="table-responsive" /* style={{ textAlign: 'center', margin: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} */>
                <h1>Users</h1>
                <table className="table table-striped table-hover" style={tableStyle}>
                    <thead>
                        <tr>
                            <th scope="col" style={thStyle}>Username</th>
                            <th scope="col" style={thStyle}>Name</th>
                            <th scope="col" style={thStyle}>Role</th>
                            <th scope="col" style={thStyle}>Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.username}>
                                <td scope="row" style={tdStyle}>{user.username}</td>
                                <td scope="row" style={tdStyle}>{user.name}</td>
                                <td scope="row" style={tdStyle}>{user.role}</td>
                                <td scope="row" style={tdStyle}>{user.group.join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <UserManager users={users} />
        </div>
    )
};

export default AdminPanel;