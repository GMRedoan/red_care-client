import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from './AuthContex';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

const Login = () => {
    const { Login } = use(AuthContext)
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const notify = (msg) => toast.error(msg);
    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        setError('')
        Login(email, password)
            .then(() => {
                Swal.fire({
                    title: "LogIn Successful. Welcome to Red Care",
                    icon: "success",
                    confirmButtonColor: "#F91617"
                });
                form.reset()
                navigate(location.state || "/")
            })
            .catch(() => {
                setError("Invalid Email or Password")
                notify("Invalid Email or Password")
            })
    }

    return (
        <div className="hero bg-base-200 py-20">
            <title>Login</title>
            <div className="hero-content flex-col">
                <div className="text-center lg:text-center">
                    <h1 className="text-5xl font-bold">Welcome Back in <span className='text-primary'>Red Care</span></h1>
                    <p className="py-6 text-accent">
                        Enter your account to continue your blood donation.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <fieldset className="fieldset">
                                <label>Email</label>
                                <input type="email" className="input"
                                    required
                                    name='email'
                                    placeholder="Email" />
                                {/* password */}
                                <label>Password</label>
                                <input type="password"
                                    name='password'
                                    className="input"
                                    required
                                    placeholder="Password" />
                                {
                                    error && <p className='text-red-500'>{error}</p>
                                }
                                <button type='submit'
                                    className="btn btn-primary mt-4 text-white 
                                font-semibold hover:bg-secondary">Login Now</button>
                            </fieldset>
                            <p className='pt-2'>Don't have any Account ! <Link state={location.state} to='/registration'><span className='text-blue-500 font-semibold hover:underline'>Registration</span></Link></p>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;