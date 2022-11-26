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

    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')



    const register = () => {
        Axios.post('http://localhost:3001/register', {
            username: usernameReg,
            password: passwordReg,
            phone: phoneReg,
            email: emailReg,
            name: nameReg,
            payment: paymentReg,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            zip: zip

        }).then((response) => {
            console.log(response);
        });

    };

    return (
        <div class="container">
            <div class="title">Registration</div>
            <form action="#">
                <div class="user__details">
                    <div class="input__box">
                        <span class="details">Full Name</span>
                        <input type="text" placeholder="E.g: John Smith" onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div class="input__box">
                        <span class="details">Username</span>
                        <input type="text" placeholder="johnWC98" onChange={(e) => setUser(e.target.value)} required />
                    </div>
                    <div class="input__box">
                        <span class="details">Email</span>
                        <input type="email" placeholder="johnsmith@hotmail.com" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div class="input__box">
                        <span class="details">Phone Number</span>
                        <input type="tel"  placeholder="012-345-6789" onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div class="input__box">
                        <span class="details">Password</span>
                        <input type="password" placeholder="********" onChange={(e) => setPass(e.target.value)} required />
                    </div>
                    <div class="input__box">
                        <span class="details">Payment</span>
                        <input type="password" placeholder="Credit/Debit" onChange={(e) => setPayment(e.target.value)} required />
                    </div>

                    <div class="input__box">
                        <span class="details">Address 1</span>
                        <input type="text" placeholder="1234 Main St" onChange={(e) => setAddress1(e.target.value)} required />
                    </div>
                    <div class="input__box">
                        <span class="details">Address 2</span>
                        <input type="text" placeholder="Apartment, studio, or floor" onChange={(e) => setAddress2(e.target.value)} required />
                    </div>
                    <div class="input__box">
                        <span class="details">City</span>
                        <input type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} required />
                    </div>
                    <div class="input__box">
                        <span class="details">State</span>
                        <input type="text" placeholder="State" onChange={(e) => setState(e.target.value)} required />
                    </div>
                    <div class="input__box">
                        <span class="details">Zip</span>
                        <input type="text" placeholder="Zip" onChange={(e) => setZip(e.target.value)} required />
                    </div>
                </div>


                <div class="button">
                    <button type="submit" value = "Register" onClick={register}>Register</button>
                </div>
            </form>
        </div>
    );
}


export default Register;