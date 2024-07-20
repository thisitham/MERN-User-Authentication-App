
import React,{useState} from "react";
import axios from "axios";

function Login() {
 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function adminLogin(e) {
        e.preventDefault();
        
        try {
            const newAdminLogin = {
                email,
                password,
            };

            axios.post("http://localhost:8060/admin/login", newAdminLogin, {withCredentials:true});  //{withCredentials:true} parameter use to save cookie in localhost server // instead of puting here we can give to all axios fun's as "axios.defaults.withCredentials = true;" in app.js
            alert("Login Successfull");
            window.location.replace('http://localhost:3000/');
        
        } catch (err) {
            console.error(err);
        }
    }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={adminLogin}>
        <input type="email" placeholder="Email"
           onChange={(e) => {setEmail(e.target.value)}}
        />
        <input type="" placeholder="Password"
           onChange={(e) => {setPassword(e.target.value)}}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;