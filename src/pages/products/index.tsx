'use client'
import formatDate from '@/utils/formatDate';
import { Box, Button, Card, Dialog, DialogActions, DialogTitle, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';

// import products from '../../utils/products'; // Import your product data
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import React from 'react';
import UpdateDialogBox from '@/Components/UpdateDialogBox';

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

const ProductsPage = () => {
  const [products,setProducts]=useState<Product[]>([]);
  const [cookies, setCookie] = useCookies(['accessToken']);
  const[openDialogUpdate,setOpenDialogUpdate]=useState(false);
  const [openo, setOpeno] = React.useState(false);
  const authToken = cookies.accessToken; 

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const getAllProducts =async()=>{
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_FLUID_API}/products/getAllProducts`,{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${authToken}`,
          },
        });
        if(response.data){
          setProducts(response.data);
        }
    } catch (error) {
      console.log(error)
    }
  }

  const HandledeleteProduct= async(productId:String)=>{
    try {
      console.log(productId)
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_FLUID_API}/products/deleteProduct/${productId}`,{
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
      setOpeno(false)
      setAnchorEl(null);
    }
  }
  useEffect(() => {
    getAllProducts();
  }, [])
  
  const handleUpdateClose=()=>{
    setOpenDialogUpdate(false);
  }

  const receiveDataFromChild = (data: React.SetStateAction<any | null>) => {
    setOpenDialogUpdate(data);
    setAnchorEl(null);
  };
  return (
    <div className="container mx-auto py-6" >
      <h1 className="text-3xl font-semibold mb-6">Products</h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <li className="bg-white shadow-md rounded-lg p-4">
            <Link href={`/products/CreateProduct`}>
              
              <Card className='p-20 flex flex-col justify-center'>
                
                <Typography className='text-center'>Create Product</Typography>
                <div className='flex justify-center' >
                  <IconButton >
                    <AddIcon fontSize='large'/>
                  </IconButton>
                </div>
                
                
              </Card>
              
            </Link>
          </li>
          {products.map((product) => (
              <li key={product._id} className="bg-white shadow-md rounded-lg p-4">
                <Box>
                  <Card>
                    <div className='relative flex justify-evenly pt-4'>
                    <Link href={`/products/viewProduct/${product.productId}`}>
                        <Image
                          src={product?.image}
                          className="w-40 h-40 object-cover rounded-lg mb-2" 
                          alt={''}                
                        />
                      </Link>
                      <p className="text-xl font-semibold">{product.description}</p>
                      <IconButton className='absolute top-2 right-2 cursor-pointer' onClick={handleClick}>
                        <MoreVertIcon />
                      </IconButton>
                    </div>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={()=>setOpenDialogUpdate(true)}>Update</MenuItem>
                      <MenuItem onClick={()=>setOpeno(true)}>Delete</MenuItem>
                      
                    </Menu>
                    <Dialog open={openDialogUpdate} onClose={handleUpdateClose}>
                      <UpdateDialogBox productItem={product} openStatus={receiveDataFromChild}/>
                    </Dialog>
                    <Dialog
                        open={openo}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Are you sure you want to delete this product?"}
                        </DialogTitle>
                        
                        <DialogActions>
                          <Button onClick={()=>HandledeleteProduct(product.productId)}>Yes</Button>
                          <Button onClick={()=>setOpeno(false)} autoFocus>
                            No
                          </Button>
                        </DialogActions>
                    </Dialog>
                  
                  <Link href={`/products/viewProduct/${product.productId}`}>
                    <div className='flex justify-around'>
                      <span className="text-xl"> Name:<p className='font-semibold'>{product.productname}</p></span>
                        <p className="text-gray-600">Category: {product.category}</p>
                    </div>
                    <div className='flex justify-around'>
                      <p className="text-gray-600">Price: ${product.price}</p>
                      <p className="text-gray-600">Created on: {formatDate(product.createdAt)}</p>
                  </div>
                  </Link>
                  
                
                  </Card>
                </Box>
              </li>
          ))}   
      </ul>
    </div>
  );
};

export default ProductsPage;
