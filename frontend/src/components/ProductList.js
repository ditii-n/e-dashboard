
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';

const ProductList = () => {
    const[products,setProducts]=React.useState([]);
    useEffect(()=>{
        getProducts();
    },[])

    {/*we will call our api here using this function*/}
    const getProducts= async ()=>{
        let result= await fetch('http://localhost:5000/products',{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        result=await result.json();
        setProducts(result);
    }
    console.warn("products",products);


    const deleteProduct=async (id)=>{
      //console.warn(id)
      let result = await fetch(`http://localhost:5000/product/${id}`,{
        method:"Delete",
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}` //adding to get the delete api called
        }
      });
      result=await result.json()
      if(result)
      {
        alert("record is deleted");
        getProducts();
      }
    }

    // this is search api calling we need to make functions to call then in onchange
    const searchHandle=async (event)=>{
      console.warn(event.target.value)
      let key = event.target.value;
      if(key){
        let result= await fetch(`http://localhost:5000/search/${key}`,{
            headers:{
              authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
      });
        result=await result.json();
        if(result){
            setProducts(result);
        }
      }
      else{
        getProducts();
      }
      
    }



  return (
    <div className='product-list'> 
        <h3>Product List</h3>
        <input type="text" className='search-product-box' placeholder='Search Product'
        onChange={searchHandle}
        />
        <ul>
          <li>S.no.</li>
          <li>Name</li>
          <li>Price</li>
          <li>Category</li>
          <li>operation</li>
        </ul>
          {
            products.length>0?products.map((item,index)=>
            <ul key={item._id}>
              <li>{index+1}</li>
              <li>{item.name}</li>
              <li>${item.price}</li>
              <li>{item.category}</li>
              <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
              <Link to={"/update/"+item._id}>Update</Link>
              </li>
            </ul>
            )
            :<h1>No result found</h1>
          }
    </div>
  )
}

export default ProductList
