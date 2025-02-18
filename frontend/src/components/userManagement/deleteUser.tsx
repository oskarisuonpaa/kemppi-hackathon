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

const DeleteUser = ({ users }: { users: User[] }) => {
    const [username, setUsername] = useState<string>("");

    const handleDeleteClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userToDelete = users.find(user => user.username === username);
        if (userToDelete) {
            if (window.confirm(`Do you want to delete user: '${username}'?`)) {
                await axios.delete(`${backendUrl}/api/users/${userToDelete.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
            window.location.reload();
            alert(`User '${username}' has been deleted successfully.`);
        } else {
            alert(`User '${username}' not found.`);
        }
    }
    return (
        <div>
            <h1>Delete user</h1>
            <form onSubmit={handleDeleteClick}>
                <label>
                    Username:
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <input type="submit" value="Delete" />
            </form>
        </div>
    )
}

export default DeleteUser