import  { React, useState , useEffect} from "react";
import Axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    const login = () => {
        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus('Login successful');
            }
        });
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <input

                type="text"
                placeholder="Username..."
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <input

                type="password"
                placeholder="Password..."
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <button onClick={login}>Login</button>
            <h1>{loginStatus}</h1>
        </div>

    );
};


export default Login;