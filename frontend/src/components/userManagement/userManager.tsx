import { useState } from "react";

interface User {
    username: string;
    name: string;
    role: string;
}

const EditUser = (users: User) => {
    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [group, setGroup] = useState<string[]>([""]);
    return (
        <div>
            <h1>Edit User</h1>
            <form>
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
                        <option value="editor">Editor</option>
                        <option value="viewer">Viewer</option>
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

const UserManager = ({ users }) => {
    return (
        <div>
            <h1>User Manager</h1>
            <EditUser users={users} />
        </div>
    )
}

export default UserManager;