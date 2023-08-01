//states are used to get the target value when we pass something like email etc
//while initializing ("") this is kept blank bcuz if we delete the content then it should return the same thing back
import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';//it is a hook which is used for redireecting

const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();//

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth)
        {
            navigate('/')
        }
    },[])


    const collectData = async () => {
        console.warn(name, email, password);
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),//stringify it bcuz api doesn't take data in this format
            headers: {
                'Content-Type': 'application/json'
            },
        });//function which is internally known as api only
        result = await result.json()
        console.warn(result);

        /*if(result){
            navigate("/")//redirects to product that is home apge for now
            //whenever signup is clicked
        }*/



        //using jwt here
        localStorage.setItem("user",JSON.stringify(result.result));//to storedata in localstorage so that even if we refresh the page it doesn't go
        localStorage.setItem("token",JSON.stringify(result.auth));//to set auth token in localstorage
        navigate("/")




    }

    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text"
                value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />

            <input className="inputBox" type="text"
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />

            <input className="inputBox" type="text"
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />

            <button onClick={collectData} className="appButton" type="button">Sign Up</button>
        </div>
    )
}
export default SignUp;

//axios is an npm module
//cors is used in general