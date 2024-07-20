import React, { useContext} from 'react';
import axios from 'axios';
//import { useNavigate } from "react-router-dom";
import c from '../../context/AuthContext';

function LogOutBtn(){
       
    const {getLogggedIn} = useContext(c);  //c.provider eka gannawa eka values wala token thiynawada naddda kiyla thamai varible eke thiyenne

    //const history = useNavigate(); //use push to path 

    async function logOut(){
        await axios.get("http://localhost:8060/admin/logout",{withCredentials:true}); //meken server eke cookie eka token eka empty karanawa
        await getLogggedIn();  //methanin e fun eka aye run karawanawa so then value is 0(false) //so logout karanawa auto 
        //history.push("/"); //after that me path ekata push karanawa(http://localhost:3000/)
        window.location.replace("http://localhost:3000/"); //use Content eka nogena me widihata auto refresh ekk ekka logout home path ekata yawannath puluwn
    }
    

    return (
        <button onClick={() => logOut()}>Log Out</button>
    )
}

export default LogOutBtn;
