
import React, {useContext} from 'react';
import {BrowserRouter , Routes, Route } from 'react-router-dom'; 

import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Customers from './components/customer/Customer'


import c from './context/AuthContext';      


function RouterFun() {           // this all function contain inside app.js <AuthContextProvider> function
   
  const { loggedIn } = useContext(c);   //useContext walin api c.provider eke thiyna value(true-if logged  or false-if not logged) eka thamai ganne me variable ekata

  return (
    
          <BrowserRouter>
            <Navbar/>
            <Routes>
                    <Route exact path="/" element={<div><h1>Home</h1></div>} />
                    
                                        {/* this mean if not logged in (if loggedIn = false=0) can only access follow URL paths */}
                   {loggedIn === false &&  
                    <>
                    <Route exact path="/register" element={<Register/>}/>
                    <Route exact path="/login" element={<Login/>}/>
                    </>
                   }  
                   
                                        {/* this mean if logged in (if loggedIn = true=0) can only access follow URL paths */}
                  {loggedIn === true && 
                    <>
                    <Route exact path="/customer" element={<Customers/>}/>
                    </>
                 } 
            </Routes>
          </BrowserRouter>
    
  );
}

export default RouterFun;