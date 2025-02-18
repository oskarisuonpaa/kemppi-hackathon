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
    const [group, setGroup] = useState<string[]>([""]);

   
    
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
        <div>
            <h1>Edit User</h1>
            <form onSubmit={handleAddSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Name:
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Role:
                    <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="admin">Admin</option>
                        <option value="viewer">Viewer</option>
                    </select>
                </label>
                <label>
                    Group 1
                    <select name="group1" value={group[0]} onChange={(e) => groupChanged(e.target.value, 0)}>
                        <option value="LAB 1">LAB 1</option>
                        <option value="LAB 2">LAB 2</option>
                        <option value="">None</option>
                    </select>
                </label>
                <label>
                    Group 2
                    <select name="group2" value={group[1]} onChange={(e) => groupChanged(e.target.value, 1)}>
                        <option value="LAB 1">LAB 1</option>
                        <option value="LAB 2">LAB 2</option>
                        <option value="">None</option>
                    </select>
                    </label>
                    <label>
                        Group 3
                        <select name="group3" value={group[2]} onChange={(e) => groupChanged(e.target.value, 2)}>
                        <option value="LAB 1">LAB 1</option>
                        <option value="LAB 2">LAB 2</option>
                        <option value="">None</option>
                        </select>
                    </label>
                <label>
                    Password:
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default EditUser