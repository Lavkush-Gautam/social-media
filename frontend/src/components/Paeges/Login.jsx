import React from 'react'
import { assets } from '../../assets/assets'
import { Star } from 'lucide-react'
import { SignIn } from '@clerk/clerk-react'


const Login = () => {
    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <img src={assets.bgImage} className='absolute top-0 left-0 -z-1 w-full h-full object-cover' alt="" />

            <div className='flex-1 flex flex-col items-start justify-between p-6 md:p-10 md:pl-40'>
                <img src={assets.logo} alt="" className='h-12 object-contain' />

                <div>
                    <div>
                        <img src={assets.group_users} alt="" className='h-8 md:h-10' />
                        <div className='flex'>
                            {Array(5).fill().map((_, i) => (<Star key={i} className='size-4 text-transparent md:size-4.5 fill-amber-500' />))}
                        </div>
                        <p className='text-sm font-medium '>Join the community of 1000+ users</p>
                    </div>


                    <h1 className='text-3xl md:text-5xl md:pb-2 font-bold bg-gradient-to-r from-indigo-950 to-indigo-800 bg-clip-text text-transparent'>More Than just friends truly connect</h1>
                    <p className='text-xl md:text-3xl text-indigo-900 max-w-60 md:max-w-md'>connect with global community</p>

                </div>
                <span className='md:h-10'>
                </span>
            </div>

            <div className='flex-1 flex items-center justify-center p-6 md:p-10'>

                <SignIn />

            </div>

        </div>
    )
}

export default Login