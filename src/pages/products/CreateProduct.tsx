import LoginComponent from '@/Components/Authentication/LoginComponent'
import { selectUser } from '@/redux/userSlice';
import { TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

const CreateProduct = () => {


  
  const [productname,setProductName]=useState('');
  const [productCategory,setProductCategory]=useState('');
  const [productDescription,setProductDescription]=useState('');
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [Price,setPrice]=useState(0);
  const user=useSelector(selectUser)

  function generateProductId(){
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  }

  
  const productId = generateProductId();


  const authToken = cookies.accessToken;
  const handleSubmit = async(e:any)=>{
    e.preventDefault()
    try {
        
      const response = await axios.post(`${process.env.NEXT_PUBLIC_FLUID_API}/products/createNew`, {
            productId:productId,
            createdBy: user?.useremail,
            productname:productname,
            
            description:productDescription, 
            price:Price, 
            category:productCategory, 
            createdAt:Date.now()

            
          },{
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${authToken}`,
            },
            });
            
            
      if(response){
        console.log('success', response);
      }
      
  } catch (error) {
      console.error(error)
  } finally{
      setProductName('');
      setProductCategory('');
      setProductDescription('');
      setPrice(0);
      
  }
    
  }
  return (
    <div >
            {/* <div className='text-left font-bold'>
                <span className='text-green-500'>company</span>
            </div> */}
        
            <div className='py-10 '>
                <h1 className='text-3xl font-bold text-green-500 mb-2 text-center'>Add a product</h1>
              <form>
                  {/* <div className='flex flex-row justify-around my-10'>
                  <label htmlFor="email">ProductId:</label>
                      <TextField
                          type="number"
                          id="productId"
                          name="productId"
                          placeholder='Product Id'
                          value={productId}
                          onChange={(e:any)=>setProductId(e.target.value)}
                          
                          required
                      />
                  </div> */}

                  <div className='flex flex-row justify-around my-10'>
                    <label htmlFor="password">Product Name:</label>
                    <TextField
                        type="text"
                        id="pName"
                        name="ProductName"
                        placeholder='Enter Product Name'
                        value={productname}
                        onChange={(e:any)=>setProductName(e.target.value)}
                        required
                        
                    />
                  </div>
                  <div className='flex flex-row justify-around my-10'>
                    <label htmlFor="password">Product Category:</label>
                    <TextField
                        type="text"
                        id="pCategory"
                        name="ProductName"
                        placeholder='Enter Product Category'
                        value={productCategory}
                        onChange={(e:any)=>setProductCategory(e.target.value)}
                        required
                        
                    />
                  </div>

                  <div className='flex flex-row justify-around my-10'>
                    <label htmlFor="password">Product Description:</label>
                    <TextField
                        type="text"
                        id="pDesc"
                        name="ProductDescription"
                        placeholder='Enter Product Description'
                        value={productDescription}
                        onChange={(e:any)=>setProductDescription(e.target.value)}
                        required
                        
                    />
                  </div>

                  <div className='flex flex-row justify-around my-10'>
                    <label htmlFor="password">Price:</label>
                    <TextField
                        type="number"
                        id="pPrice"
                        name="ProductPrice"
                        placeholder='Enter Product Price'
                        value={Price}
                        onChange={(e:any)=>setPrice(e.target.value)}
                        required
                        
                    />
                  </div>

                  <div className='flex justify-center'>
                  <button className='border-2 
                          border-white bg-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:text-white' 
                          onClick={handleSubmit}>Add Product</button>
                
                  </div>
              </form>
            
            </div>
        </div>
  )
}

export default CreateProduct