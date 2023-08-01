import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Login=()=> {
    const[email,setEmail]=React.useState('');
    const[password,setPassword]=React.useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        const auth= localStorage.getItem('user');
        if(auth){
            navigate("/")
        }
    },[])

    const handleLogin= async ()=>{
        console.warn("email","password",email,password)
        let result = await fetch('http://localhost:5000/login',{
            method: "post",
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        result=await result.json();
        console.warn(result)
        //if(result.name){
            if(result.auth){//bcuz the name comes inside user
            localStorage.setItem("user",JSON.stringify(result.user));//bcuz user is inside result
            localStorage.setItem("token",JSON.stringify(result.auth));//to setup auth that its logged in
            navigate("/")
        }else{
            alert("please enter correct details")
        }
    }
    return(
        <div className="login">
            <h1>Login</h1>
            <input type="text" className="inputBox" placeholder="enter email"
            onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <input type="password" className="inputBox" placeholder="enter password"
            onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <button onClick={handleLogin} className="appButton" type="button">Login </button>
        </div>
    );
}

export default Login;
//use effect function is used for the time when we are
//already logged in and the if we type the url we should nt be able to 
//navigate to that page it(func) restricts it 