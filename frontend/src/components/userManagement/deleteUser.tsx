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

const deleteUser = async (userId: string) => {
    if (window.confirm(`Are you sure you want to delete this user?`)) {
        await axios.delete(`${backendUrl}/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        window.location.reload();
        alert(`User has been deleted successfully.`);
    }
}

const DeleteUser = ({ users }: { users: User[] }) => {
    const [username, setUsername] = useState<string>("");

    const handleDeleteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userToDelete = users.find(user => user.username === username);
        if (userToDelete) {
            deleteUser(userToDelete.id);
        } else {
            alert(`User '${username}' not found.`);
        }
    }

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Delete User</h1>
            <form onSubmit={handleDeleteSubmit} style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "10px", fontWeight: "bold" }}>
                    Username:
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: "8px", marginTop: "5px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "4px" }} />
                </label>
                <input type="submit" value="Submit" style={{ padding: "10px", backgroundColor: "#F57300", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }} />
            </form>
        </div>
    )
}

export default DeleteUser;