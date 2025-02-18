import DeleteUser from "./deleteUser";
import EditUser from "./addUser";

interface User {
    username: string;
    name: string;
    role: string;
    group: string[];
    id: string;
}

const UserManager = ({ users }: { users: User[] }) => {
    return (
        <>
            <div>
                <h1>User Manager</h1>
                <EditUser users={users} />
            </div>
            <div>
                <DeleteUser users={users} />
            </div>
        </>
    )
}

export default UserManager;