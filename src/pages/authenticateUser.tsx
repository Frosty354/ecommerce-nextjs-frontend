import LoginComponent from '@/Components/Authentication/LoginComponent'
import SignupComponent from '@/Components/Authentication/SignupComponent'
import React from 'react'

export default function authenticateUser (){
  return (
    <main
      className={`flex min-h-screen flex-col items-center w-full flex-1 justify-center px-20 text-center `}
    >
        <div className='bg-white rounded-2xl shadow-2xl flex justify-between w-2/3 max-w-4xl'>
            <LoginComponent/>
            <SignupComponent/>
          </div>
    </main>
  )
}
