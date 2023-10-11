import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
type Product = {
    _id: string; // ObjectId
    productname: string;
    image:string
    productId: String; 
    description: string;
    price: number; // Int32
    category: string;
    createdBy:string;
    createdAt: Date;
    __v: number;
  };

  type UpdateDialogBoxProps = {
    productItem: Product;
    openStatus:(data: React.SetStateAction<any | null>) => void;
  };
  
const UpdateDialogBox = ({productItem,openStatus}:UpdateDialogBoxProps) => {
    const {category,description,productname,price,productId}=productItem

    const[updateCategory,setUpdateCategory]=useState(category);
    const[updateDescription,setUpdateDescription]=useState(description);
    const[updateProductname,setUpdateProductname]=useState(productname);
    const[updatePrice,setUpdatePrice]=useState(price);
    const [cookies, setCookie] = useCookies(['accessToken']);

    const authToken = cookies.accessToken; 
    const handleCloseDialog = ()=>{
        openStatus(false)
    }
    const handleUpdate = async() => {
        try {
            console.log(productId)
            const response = await axios.put(`${process.env.NEXT_PUBLIC_FLUID_API}/products/updateProduct/${productId}`,{
                productId:productId,
                productname:updateProductname,
                description:updateDescription, 
                price:updatePrice, 
                category:updateCategory, 
            },
            {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `${authToken}`,
                },
            });
              if(response.data){
                console.log(response)
              }
          } catch (error) {
            console.log(error)
          } finally{
            handleCloseDialog();
          }
    }
    function checkDisabled(){
        return category===updateCategory
            &&description===updateDescription
            &&productname===updateProductname &&price===updatePrice;
    }
  return (
    <>
        <DialogTitle>Update Product info</DialogTitle>
        <DialogContent>
        {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
        </DialogContentText> */}
                <div className='flex flex-row justify-around my-10'>
                    <label htmlFor="password">Product Name:</label>
                    <TextField
                        type="text"
                        id="pName"
                        name="ProductName"
                        placeholder='Enter Product Name'
                        value={updateProductname}
                        onChange={(e:any)=>setUpdateProductname(e.target.value)}
                        required
                        
                    />
                </div>
                <div className='flex flex-row justify-around my-10'>
                    <label htmlFor="password">Product Description:</label>
                    <TextField
                        type="text"
                        id="pName"
                        name="ProductDescription"
                        placeholder='Enter Product description'
                        value={updateDescription}
                        onChange={(e:any)=>setUpdateDescription(e.target.value)}
                        required
                        
                    />
                </div>
                <div className='flex flex-row justify-around my-10'>
                    <label htmlFor="password">Product Category:</label>
                    <TextField
                        type="text"
                        id="pName"
                        name="ProductName"
                        placeholder='Enter Product Category'
                        value={updateCategory}
                        onChange={(e:any)=>setUpdateCategory(e.target.value)}
                        required
                        
                    />
                </div>
                <div className='flex flex-row justify-around my-10'>
                    <label htmlFor="password">Product Price:</label>
                    <TextField
                        type="number"
                        id="uPrice"
                        name="ProductPrice"
                        placeholder='Enter Product price'
                        value={updatePrice}
                        onChange={(e:any)=>setUpdatePrice(e.target.value)}
                        required
                        
                    />
                </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={checkDisabled()} >Update</Button>
        </DialogActions>
    </>
  )
}

export default UpdateDialogBox