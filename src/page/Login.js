import '../style/login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUserChange = (e) => {
        setUser(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: user, //emilys
            password: password, //emilyspass
            exopiresInMins: 60
        };

        fetLogIn(data, navigate);
    }
    return (
        <div style={{ height: "100vh", justifyContent: "center", display: "flex", alignItems: "center" }}>
            <div className="containerLogin">
                <div className="containerLogin-title">
                    <h3 id="login-title">Login</h3>
                </div>
                <form className="formLogin" onSubmit={handleSubmit}>
                    <p>Username</p>
                    <input className="login-input" type="text" placeholder="User" name="user" onChange={handleUserChange}/>
                    <p>Password</p>
                    <input className="login-input" type="password" placeholder="Password" name="password" onChange={handlePasswordChange}/>
                    <div className="login-button-container">
                        <button className="login-button" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function fetLogIn(data, navigate) {
    fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        const hasNoToken = response?.accessToken === undefined;
        if (hasNoToken) {
            alert("Credenciales incorrectas");
            return;
        }

        localStorage.setItem("token", response.accessToken);
        navigate("/");

        console.log(response)
    });
}