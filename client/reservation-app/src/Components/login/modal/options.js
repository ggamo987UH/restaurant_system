import React from "react";
import Login from "../log/login";
import Register from "../register/registration";
import { useState } from "react";
import "./modal.css";

const Options = () => {
    const [isShown, setIsShown] = useState(false);
    const [isShown2, setIsShown2] = useState(false);
    const handleClick = even => {
        setIsShown(!isShown);
    };
    const handleClick2 = even => {
        setIsShown2(!isShown2);
    };

    return (
        <div className="options">
            <div className="options__container">
                <div className="options__container__left">
                    <h1>Already have an account?</h1>
                    <button onClick={handleClick} className= "c-btn">Login</button>
                    {isShown && <Login />}
                </div>

                <div className="options__container__right">
                    <h1>Don't have an account?</h1>
                    <button onClick={handleClick2}className = "c-btn">Register</button>
                    {isShown2 && <Register />}
                </div>
                
            </div>
        </div>
    );
}
export default Options;