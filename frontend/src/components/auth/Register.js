
import React,{useState} from "react";
import axios from "axios";

function Register() {
 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");

    async function adminRegister(e) {
        e.preventDefault();
        
        try {
            const newAdmin = {
                email,
                password,
                passwordVerify
            };

            axios.post("http://localhost:8060/admin", newAdmin, {withCredentials:true});  //{withCredentials:true} parameter use to save cookie in localhost server // instead of puting here we can give to all axios fun's as "axios.defaults.withCredentials = true;" in app.js
            alert("Admin Registered");
        
        } catch (err) {
            console.error(err);
        }
    }

  return (
    <div>
      <h1>Register a new account</h1>
      <form onSubmit={adminRegister}>
        <input type="email" placeholder="Email"
           onChange={(e) => {setEmail(e.target.value)}}
        />
        <input type="" placeholder="Password"
           onChange={(e) => {setPassword(e.target.value)}}
        />
        <input type="" placeholder="Verify your password"
           onChange={(e) => {setPasswordVerify(e.target.value)}}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;