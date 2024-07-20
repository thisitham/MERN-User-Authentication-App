import axios from 'axios';
import React, {useState, useEffect, createContext} from 'react'  //createContext and useContext also hooks functions in react

const c = createContext();  // Creating a context and assigning it to variable 'c'

function AuthContextProvider(props) {  //Defining a functional component named AuthContextProvider which takes props as an argument.

    const [loggedIn, setLoggedIn] = useState(undefined);  //default 'loggedIn' variable assign as 'undefined'//pahala 'setLoggedIn(loggedInRes.data)'; fun eken ena value eka mekata assign wenawa
                                                          //in backend eke api hadala thiyenne When logged in = true(1), when not loged in = false(0) wena widihata //It mean server cookie eke token thiynawanam true else false
                                                          //so me pahala function eken ena boolean "1" or "0" thamai me 'loggedIn  variable ekata assign wenne.

    async function getLogggedIn() {                                               //Declaring an asynchronous function getLoggedIn.      
        const loggedInRes = await axios.get("http://localhost:8060/admin/loggedIn",{withCredentials:true});    //HTTP GET request to the URL http://localhost:8060/admin/loggedIn using axios. //withCredentials: true is used to include cookies in the request.
        setLoggedIn(loggedInRes.data);                                            //me fun ekta enne true or false respose data ekk. eka thamai uda loggedIn variable ekata yane
    }

    useEffect(() => {
        getLogggedIn();         //excute(run) the function inside useEffect()
    }, []);

                                                     //in c.provider context eke loggedIN VARIABLE EKa thiynawa eke include wenne true or false kiyna value state eka anuwa
  return (                                            
    <c.Provider value = {{loggedIn, getLogggedIn}}>   {/*passes the current state 'loggedIn' and the 'getLoggedIn' function as the context value. //AuthContextProvider gen ena value gannawa create karapu context eka athulata*/}
        {props.children}         {/*In this case, props.children will be <RouterFun/> in app.js, beacause its in between AuthContextProvider fun// AuthContextProvider fun eke child kenek widihata ganna kiyla thamai meka pass karanne api */}
                                {/*{props.children} allows the AuthContextProvider to render its children within the c.provider. This way, any child components can access the context values provided*/}
    </c.Provider>
  )
}

export default c;
export {AuthContextProvider};
