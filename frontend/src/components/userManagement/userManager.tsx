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
        <div style={{border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9", padding: "20px", margin: "20px"}}>
            <h1 style={{textAlign: "center"}}>User Manager</h1>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <div style={{margin: "20px"}}>
                    <EditUser users={users} />
                </div>
                <div style={{margin: "20px"}}>
                    <DeleteUser users={users} />
                </div>
            </div>
            </div>
        </>
    )
}

export default UserManager;