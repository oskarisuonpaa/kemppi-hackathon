import axios from "axios";
import { useState } from "react";

const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const token = localStorage.getItem("authToken");

interface User {
    username: string;
    name: string;
    role: string;
    group: string[];
    id: string;
}

const modifyUser = async (oldUser: User, username: string, name: string, role: string, group: string[], password: string) => {
    if (window.confirm(`'${username}' is already in the database. Do you want to modify it?`)) {
        const modifiedUser = await axios.put(`${backendUrl}/api/users/${oldUser.id}`, {
        username,
        name,
        role,
        group,
        password
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return modifiedUser;
    }
}

const addUser = async (username: string, name: string, role: string, group: string[], password: string) => {
    const newUser = await axios.post(`${backendUrl}/api/users`, {
        username,
        name,
        role,
        group,
        password
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
    });
    window.location.reload();
    alert(`User '${username}' has been created successfully.`);
    return newUser;
}

const EditUser = ({ users }: { users: User[] }) => {
    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [role, setRole] = useState<string>("viewer");
    const [password, setPassword] = useState<string>("");
    const [group, setGroup] = useState<string[]>(["", "", ""]);

    const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const oldUser = users.find(user => user.username === username);
        if(oldUser) {
            modifyUser(oldUser, username, name, role, group, password);
        } else {
            if (window.confirm(`Do you want to add user: '${username}'?`)) {
                addUser(username, name, role, group, password);
            }
        }
    }

    const groupChanged = (newGroup: string, index: number) => {
        const groups = [...group];
        groups[index] = newGroup;
        setGroup(groups);
    }

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Edit User</h1>
            <form onSubmit={handleAddSubmit} style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "10px", fontWeight: "bold" }}>
                    Username:
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: "8px", marginTop: "5px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "4px" }} />
                </label>
                <label style={{ marginBottom: "10px", fontWeight: "bold" }}>
                    Name:
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "8px", marginTop: "5px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "4px" }} />
                </label>
                <label style={{ marginBottom: "10px", fontWeight: "bold" }}>
                    Role:
                    <select name="role" value={role} onChange={(e) => setRole(e.target.value)} style={{ width: "100%", padding: "8px", marginTop: "5px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "4px" }}>
                        <option value="admin">Admin</option>
                        <option value="viewer">Viewer</option>
                    </select>
                </label>
                <label style={{ marginBottom: "10px", fontWeight: "bold" }}>
                    Group 1
                    <select name="group1" value={group[0]} onChange={(e) => groupChanged(e.target.value, 0)} style={{ width: "100%", padding: "8px", marginTop: "5px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "4px" }}>
                        <option value="LAB 1">LAB 1</option>
                        <option value="LAB 2">LAB 2</option>
                        <option value="">None</option>
                    </select>
                </label>
                <label style={{ marginBottom: "10px", fontWeight: "bold" }}>
                    Group 2
                    <select name="group2" value={group[1]} onChange={(e) => groupChanged(e.target.value, 1)} style={{ width: "100%", padding: "8px", marginTop: "5px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "4px" }}>
                        <option value="LAB 1">LAB 1</option>
                        <option value="LAB 2">LAB 2</option>
                        <option value="">None</option>
                    </select>
                </label>
                <label style={{ marginBottom: "10px", fontWeight: "bold" }}>
                    Group 3
                    <select name="group3" value={group[2]} onChange={(e) => groupChanged(e.target.value, 2)} style={{ width: "100%", padding: "8px", marginTop: "5px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "4px" }}>
                        <option value="LAB 1">LAB 1</option>
                        <option value="LAB 2">LAB 2</option>
                        <option value="">None</option>
                    </select>
                </label>
                <label style={{ marginBottom: "10px", fontWeight: "bold" }}>
                    Password 8 chars min, 1 number, 1 uppercase, 1 special character:
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "8px", marginTop: "5px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "4px" }} />
                </label>
                <input type="submit" value="Submit" style={{ padding: "10px", backgroundColor: "#F57300", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }} />
            </form>
        </div>
    )
}

export default EditUser;