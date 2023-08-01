import React from 'react';
//to create links routing
//inspect in css is devtools

//when we logout it should go to signup hence logout function is made
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        //console.warn("apple")
        navigate('/signup')
    }
    return (
        <div>
            <img src="https://static.vecteezy.com/system/resources/previews/000/397/015/original/modern-company-logo-design-vector.jpg" 
            alt="Promote your Brands on Multiple eCommerce Marketplaces" className='logo'
            tabindex="0" aria-label="Promote your Brands on Multiple eCommerce Marketplaces"></img>
            {auth ? <ul className='nav-ul'>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>

                {/*previous when we had to deal with only sign up<li>{auth?<Link onClick={logout} to="/signup">Logout</Link>:
                <Link to="/signup">Sign Up</Link>}</li>
                <li><Link to="/login">Login</Link></li>*/}
                {/*
                    auth?<li><Link onClick={logout} to="/signup">Logout</Link></li>:<>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    </>
            */}
            </ul>
                : <ul className='nav-ul nav-right'>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>}
        </div>
    )
}
export default Nav;
//if user is signed in it wont show sing in option only logout
//******rafc is a shortcut to create a new function */
//<> </>is known as fragmentation used when we wnat to wrap up two in one component