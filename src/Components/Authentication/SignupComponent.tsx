import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import EmailIcon from '@mui/icons-material/Email'
import PasswordIcon from '@mui/icons-material/Password';
import axios from 'axios';


const SignupComponent = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword]=useState('')
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleEmailChange = (e:any) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e:any) => {
      setPassword(e.target.value);
    };

    const handleConfirmPassword=(e:any)=>{
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = async(e:any) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordsMatch(false);
            return;
          }
       
          try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_FLUID_API}/user/signup`, 
            {
                useremail:email,
                password:password
            },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    
      console.log('found token:', response.data);
            
        } catch (error) {
            console.error(error)
        } finally{
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setPasswordsMatch(true)
        }
      };

  return (
    <div className='w-3/5 p-8 bg-green-500 text-white rounded-r-2xl px-12 text-center'>
          <h2 className='text-3xl font-bold '> Hello, friend!</h2>
          <div className='border-2 w-10 border-white inline-block mb2'></div>
          <p className='mb-4'>Enter your personal information and get started with our product</p>
          <form>
                <div className='flex flex-row justify-center my-4'>
                {/* <label htmlFor="email">Email:</label> */}
                    <TextField
                        type="email"
                        id="signUpemail"
                        name="signUpemail"
                        placeholder='Enter your email'
                        value={email}
                        onChange={handleEmailChange}
                        InputProps={{
                            startAdornment:<EmailIcon/>
                        }}
                        required
                    />
                </div>

                <div className='my-4'>
                {/* <label htmlFor="password">Password:</label> */}
                <TextField
                    type="password"
                    id="signpassword"
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
                <div className='my-4'>
                {/* <label htmlFor="password">Password:</label> */}
                <TextField
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={handleConfirmPassword}
                    required
                    InputProps={{
                        startAdornment: <PasswordIcon/>
                    }}
                />
                </div>
          </form>
          {!passwordsMatch && <p>Passwords do not match.</p>}
          <button onClick={handleSubmit} className='border-2 
                    border-white 
                    rounded-full 
                    px-12 py-2 
                    inline-block 
                    font-semibold 
                    hover:bg-white hover:text-green-500'>Signup</button>
        </div>
  )
}

export default SignupComponent