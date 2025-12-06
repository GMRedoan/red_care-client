import React from 'react';
import logo2 from '../assets/logo2.png'

const Loading = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='text-4xl md:text-6xl font-semibold flex justify-center items-center'>
                Red
                <div className='w-25 md:w-35 animate-bounce'><img src={logo2} alt="" /></div>
                <span className='text-primary'>Care</span>
            </div>
         </div>
    );
};

export default Loading;