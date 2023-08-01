//npm i nodemon express mongodb mongoose
//npx create-react-app <foldername>
//npm i react-router-dom

import './App.css';
import  Nav from './components/Nav';
//whenever link is used for routing we need to import browse router in app js
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        
        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/add" element={<AddProduct/>}/>
        <Route path="/update/:id" element={<UpdateProduct/>}/>
        <Route path="/logout" element={<h1>Logout</h1>}></Route>
        <Route path="/profile" element={<h1>Profile Component</h1>}></Route>
        </Route>

        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" exact element={<Login />}/> {/*here the path p was caps t y i got the error*/}
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
