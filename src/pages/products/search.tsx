import { selectSearchQuery } from '@/redux/userSlice';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import formatDate from '@/utils/formatDate';
import { Box, Button, Card, Dialog, DialogActions, DialogTitle, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Image from 'next/image';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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


export default function Search() {
  const router=useRouter();
  const [debouncedValue,setDebouncedValue]=useState('');
  const [products,setProducts]=useState<Product[]>([]);
  const[openDialogUpdate,setOpenDialogUpdate]=useState(false);
  const[loading,setLoading]=useState(false);
  const [cookies, setCookie] = useCookies(['accessToken']);
  const searchQuery = useSelector(selectSearchQuery);
  const [openo, setOpeno] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const authToken = cookies.accessToken; 
  const open = Boolean(anchorEl);
  const getSearchResults= async(query:string)=>{
    try {
      setLoading(true)
      const response = await axios.get(`${process.env.NEXT_PUBLIC_FLUID_API}/products/search?query=${query}`,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${authToken}`,
        },
      })
      if(response.data){
        setProducts(response.data)
      }
      
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
    }

  }


  useEffect(() => {
    const timeout= setTimeout(()=>{
      setDebouncedValue(searchQuery);
      if(searchQuery){
        getSearchResults(searchQuery);
      }
    },1800)
  
    return () => {
      clearTimeout(timeout)
    }
  }, [searchQuery])
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const handleUpdateClose=()=>{
    setOpenDialogUpdate(false);
  }

  const receiveDataFromChild = (data: React.SetStateAction<any | null>) => {
    setOpenDialogUpdate(data);
    setAnchorEl(null);
  };

  return (
    <>
    {searchQuery.length?<div>
    {loading?<div>Loading...</div>:<div>Showing results for {debouncedValue}</div>}
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <li key={product._id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex flex-col justify-between h-full relative pt-4">
                <Link href={`/products/viewProduct/${product.productId}`}>
                  <Image
                    src={product?.image}
                    className="w-40 h-40 object-cover rounded-lg mb-2 cursor-pointer"
                    alt=""
                  />
                </Link>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold">{product.description}</p>
                  <IconButton className='absolute top-2 right-2 cursor-pointer' onClick={handleClick}>
                        <MoreVertIcon />
                      </IconButton>
                </div>
                <Menu
                  id="basic-menu-search"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => setOpenDialogUpdate(true)}>Update</MenuItem>
                  <MenuItem onClick={() => setOpeno(true)}>Delete</MenuItem>
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
                  <div className="mt-2">
                    <span className="text-xl">Name: </span>
                    <p className="text-xl font-semibold">{product.productname}</p>
                    <p className="text-gray-600">Category: {product.category}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-gray-600">Price: ${product.price}</p>
                    <p className="text-gray-600">Created on: {formatDate(product.createdAt)}</p>
                  </div>
                </Link>
              </div>
            </li>
          ))}
    </ul>
    </div>:<div className='flex justify-center items-center mt-8'>Looking for something?...</div>}
    </>
  )
}
