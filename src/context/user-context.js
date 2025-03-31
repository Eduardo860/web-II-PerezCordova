import { createContext, useState } from "react";

export const UserContext = createContext(null);

export function UserContextProvider({children}) {
    const [user, setUser] = useState({
        name: "John Doe",
        email: "6oWZM@example.com",
        age: 30
    })

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}