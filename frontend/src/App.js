import './App.css';
import React, {useContext} from 'react';

import RouterFun from './Router';

import { AuthContextProvider } from './context/AuthContext';



//axios.defaults.withCredentials = true;

function App() {


  return (
    <AuthContextProvider>  {/*all function in betweeen 'AuthContextProvider' function*/}
          <RouterFun/>     {/*this is router paths al*/}
    </AuthContextProvider>
  );
}

export default App;
