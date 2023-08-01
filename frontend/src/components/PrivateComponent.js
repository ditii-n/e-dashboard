//private component contains other pages than signup it will navigate to that page 
//if user is not logged in
import React from "react";
import {Navigate,Outlet} from 'react-router-dom';

const PrivateComponent=()=>{
    const auth=localStorage.getItem('user')
    return auth? <Outlet/>:<Navigate to="/signup"/>

}
export default PrivateComponent