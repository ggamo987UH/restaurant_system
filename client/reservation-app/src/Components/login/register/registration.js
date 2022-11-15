import React, { useState } from "react";
import Axios from "axios";
import './registration.css';



const Register = () => {
  
    const [usernameReg, setUser] = useState('')
    const [passwordReg, setPass] = useState('')
    const [emailReg, setEmail] = useState('')
    const [phoneReg, setPhone] = useState('')
    const [nameReg, setName] = useState('')
    const [paymentReg, setPayment] = useState('')


    const register = () => {
        Axios.post('http://localhost:3001/register', {
            username: usernameReg,
            password: passwordReg,
            phone: phoneReg,
            email: emailReg,
            name: nameReg,
            payment : paymentReg
        }).then((response) => {
            console.log(response);
        });
    };

    return (
        <div className="registration">
           
                    <form>
                        <label>Username</label>
                        <input type="text" placeholder="Enter Username" onChange={(e) => setUser(e.target.value)} />
                        
                        <label>Password</label>
                        <input type="password" placeholder="Enter Password" onChange={(e) => setPass(e.target.value)} />
                    
                        <label>Email</label>
                        <input type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />

                        <label>Phone</label>
                        <input type="phone" placeholder="Enter Phone" onChange={(e) => setPhone(e.target.value)} />

                        <label>Name</label>
                        <input type="name" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />

                        <label>Payment</label>
                        <input type="payment" placeholder="Enter Payment" onChange={(e) => setPayment(e.target.value)} />

                        <button type="submit" onClick={register}>Register</button>
                    </form>
           
        </div>
    );
}


export default Register;