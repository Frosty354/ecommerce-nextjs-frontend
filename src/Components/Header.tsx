import React from 'react'
import { Link,Button, TextField } from '@mui/material';
import { useSession,signIn,signOut } from 'next-auth/react';
import { Children, useEffect, useState } from 'react'



import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { clearUser, selectIsAuthenticated, selectUser } from '@/redux/userSlice';
import { useCookies } from 'react-cookie';
import SearchBar from './SearchBar';



const Header = () => {
    const router=useRouter();
    const user=useSelector(selectUser);
    const isAuthencated=useSelector(selectIsAuthenticated);
    const[cookie,setCookie,removeCookie]=useCookies();

    const handleLogout=()=>{
      signOut();
      removeCookie('accessToken');
      clearUser()
    }


  
  return (
    <div>
      <nav className='bg-black text-white py-5
                flex justify-between px-10'>
        <h1 onClick={()=>router.push('/products')} className='text-5xl'>Ecommerce</h1>
        {isAuthencated&&
        <SearchBar/>
        } 
        <div className='flex items-center gap-6'>
          
      {//@ts-ignore
          isAuthencated?<><div>Hello {user?.useremail.split('@')[0]}</div><Button onClick={handleLogout}>Logout</Button></>:
          
          <Button onClick={()=>router.push('/authenticateUser')}>Login</Button>
        }
          
            
        
          
        </div>
      </nav>
    </div>
  )
}

export default Header