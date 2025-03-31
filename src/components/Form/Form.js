import MyInput from "./MyInput"
import "../../style/form.css"
import { UserContext, UserContextProvider } from "../../context/user-context"
import { useContext } from "react"
export default function Form() {
    return (
        <UserContextProvider>
            <FormContent />
        </UserContextProvider>
    )
}

function FormContent() {
    const { user, setUser } = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ 
            ...prevUser, 
            [name]: value 
        }));
    };

    const inputName = {
        type: "text",
        placeholder: "Username",
        valor: user.name,
        funcion: handleChange,
        name: "name"
    }
    const inputEmail = {
        type: "email",
        placeholder: "Email",
        valor: user.email,
        funcion: handleChange,
        name: "email"
    }
    const inputAge = {
        type: "number",
        placeholder: "Age",
        valor: user.date,
        funcion: handleChange,
        name: "age"
    }
    return (
        <form className="myForm">
            <div>
                <MyInput {...inputName} />
            </div>
            
            <div>
                <MyInput {...inputEmail} />
            </div>

            <div>
                <MyInput {...inputAge} />
            </div>
        </form>
    )
}