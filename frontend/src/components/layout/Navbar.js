import React,{useContext} from "react";
import { Link } from "react-router-dom";
import LogOutBtn from "../auth/LogOutBtn";

import c from "../../context/AuthContext";



function Navbar() {

    const { loggedIn } = useContext(c);     //useContext walin api c.provider eke thiyna value(true-if logged  or false-if not logged) eka thamai ganne me variable ekata

    return(
        <div>
              <Link to="/">Home</Link>


                                   {/* this mean if not logged in (if loggedIn = false=0) can only access follow content in NavBar */}
            {loggedIn === false && (     
                <>
                <Link to="/register">Register</Link>
                <Link to="/login">Log in</Link> 
                </>  
            )}  
                                   {/* this mean if logged in (if loggedIn = true=0) can only access follow content in NavBar */}
            {loggedIn === true && (
                <>   
                <Link to="/customer">Customers</Link>
                <LogOutBtn/>
                </>  
            )} 
      </div> 
    );
}

export default Navbar;