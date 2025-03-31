import { UserContext,UserContextProvider } from "../context/user-context";
import { useContext } from "react";

export default function Profile() {
    return (
    <UserContextProvider>
        <ProfileContent />
    </UserContextProvider>
    )
}

function ProfileContent() {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
        </div>
    )
}