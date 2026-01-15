import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from './AuthContex';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAxios from '../Hooks/UseAxios';

const Login = () => {
    const axiosInstance = useAxios()
    const { login, googleLogin } = use(AuthContext)
    const [error, setError] = useState('');
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || "/";
    const notify = (msg) => toast.error(msg);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const fillAdmin = () => {
        setEmail('redoangazi69@gmail.com');
        setPassword('Admin12');
    };

    const fillUser = () => {
        setEmail('its.redu44@gmail.com');
        setPassword('1234aS');
    };


    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        setError('')
        login(email, password)
            .then(() => {
                Swal.fire({
                    title: "LogIn Successful. Welcome to Red Care",
                    icon: 'success',
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

    // google login
    const handleGoogle = () => {
        googleLogin()
            .then(async (result) => {
                const { displayName, email } = result.user;

                const newUser = {
                    name: displayName,
                    email: email,
                    role: 'donor',
                    status: 'active'
                };

                try {
                    const res = await axiosInstance.post('/users', newUser);
                    console.log('User saved to DB:', res.data);

                    Swal.fire({
                        title: "LogIn Successful. Welcome to Red Care 🎊",
                        icon: "success",
                        confirmButtonColor: "#F91617"
                    });

                    navigate(from, { replace: true });
                } catch (error) {
                    console.error('Error saving user:', error);
                    Swal.fire({
                        title: "Failed to save user info",
                        text: error.message || 'Please try again',
                        icon: "error",
                        confirmButtonColor: "#F91617"
                    });
                }
            })
            .catch(error => {
                console.error('Google login error:', error);
                notify(error.message || "Google login failed");
            });
    };
    return (
        <div className="py-8 md:py-20 hero">
            <title>Login</title>
            <div className="hero-content flex-col">
                <div className="text-center lg:text-center">
                    <h1 className="text-4xl md:text-5xl font-bold">Welcome Back in <span className='text-primary'>Red Care</span></h1>
                    <p className="py-6 text-accent">
                        Enter your account to continue your blood donation.
                    </p>
                </div>
                <div className="card bg-base-200 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <fieldset className="fieldset">
                                <label>Email</label>
                                <input type="email" className="input w-full"
                                    required
                                    name='email'
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {/* password */}
                                <label>Password</label>
                                <div className='relative'>
                                    <input type={showPass ? 'text' : 'password'}
                                        name='password'
                                        required
                                        className="input w-full"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <p
                                        onClick={() => setShowPass(!showPass)}
                                        className='absolute top-3.5 right-5 cursor-pointer z-10'>{showPass ? <FaEyeSlash /> : <FaEye />}</p>
                                </div>
                                {
                                    error && <p className='text-red-500'>{error}</p>
                                }

                                <div className="flex gap-2 mt-2">
                                    <button
                                        type="button"
                                        onClick={fillAdmin}
                                        className="btn btn-outline btn-sm w-1/2"
                                    >
                                        Login as Admin
                                    </button>

                                    <button
                                        type="button"
                                        onClick={fillUser}
                                        className="btn btn-outline btn-sm w-40"
                                    >
                                        Login as User
                                    </button>
                                </div>


                                <button type='submit'
                                    className="btn btn-primary mt-2 text-white 
                                font-semibold hover:bg-secondary">Login Now</button>

                                <button
                                    onClick={handleGoogle}
                                    type='button'
                                    className="btn bg-white text-black border-[#e5e5e5]">
                                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                    Login with Google
                                </button>

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