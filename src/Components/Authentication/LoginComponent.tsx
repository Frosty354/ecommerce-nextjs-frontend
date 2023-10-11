import { TextField } from '@mui/material';
import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email'
import PasswordIcon from '@mui/icons-material/Password';
import axios from 'axios';
import { selectIsAuthenticated, setUser } from '@/redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

const LoginComponent = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const router = useRouter();
    const [cookies, setCookie] = useCookies(['accessToken']);
    const dispatch = useDispatch();

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    
    try {
        
        const response = await axios.post(`${process.env.NEXT_PUBLIC_FLUID_API}/user/login`, {
              useremail:email,
              password:password
            },{
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              
              
        if(response){
          console.log('found token:', response.data);
          const token=response.data.accessToken;
          setCookie("accessToken",token);
          const userObj={
            useremail:response.data.useremail,
            user_id:response.data.id}
            //@ts-ignore
          dispatch(setUser(userObj));
        }
        
    } catch (error) {
        console.error(error)
    } finally{
        setEmail('');
        setPassword('');
    }
  };
  if (isAuthenticated) {
    // Redirect to the product page
    router.push('/products'); // Replace '/products' with your product page route
  }

  return (

        <div className='w-3/5 p-5'>
            <div className='text-left font-bold'>
                {/* <span className='text-green-500'>company</span> */}
            </div>
        
            <div className='py-10 '>
                <h2 className='text-3xl font-bold text-green-500 mb-2'>Signin to your account</h2>
                <div className='border-2 w-10 border-green inline-block mb-2'></div>
            

        
          
            <form>
                <div className='flex flex-row justify-center my-10'>
                {/* <label htmlFor="email">Email:</label> */}
                    <TextField
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Enter your email'
                        value={email}
                        onChange={handleEmailChange}
                        InputProps={{
                            startAdornment:<EmailIcon/>
                        }}
                        required
                    />
                </div>

                <div className='my-10'>
                {/* <label htmlFor="password">Password:</label> */}
                <TextField
                    type="password"
                    id="password"
                    name="password"
                    placeholder='Enter password'
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    InputProps={{
                        startAdornment: <PasswordIcon/>
                    }}
                />
                </div>
                <div>
                <button className='border-2 
                        border-white bg-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:text-white' 
                        onClick={handleSubmit}>Login</button>
               
                </div>
            </form>
            </div>
        </div>

  
  )
}

export default LoginComponent