import Lottie from 'lottie-react';
import errorLottie from '../assets/404 error.json'
import { Link } from 'react-router';
 
const Error = () => {
    return (
        <div className="relative">
            <div className="fixed inset-0 z-0 flex justify-center items-center">
                <div>
                    <Lottie
                        animationData={errorLottie}
                        loop={true}
                        autoplay={true}
                        className="md:w-240" />
                </div>
            </div>

            <div className='relative z-10 top-140 flex flex-col justify-center items-center'>
                 <Link to='/' className='btn bg-red-500 border-0 hover:bg-white hover:text-black mt-10'>Back to Home</Link>
            </div>
        </div>
    );
};

export default Error;