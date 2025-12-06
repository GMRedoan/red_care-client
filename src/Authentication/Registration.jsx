import React, { use, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from './AuthContex';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

const Registration = () => {
    const { createUser, updateUserProfile, setUser } = use(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const notify = (msg) => toast.error(msg);
    const [error, setError] = useState('')
    const [showPass, setShowPass] = useState(false)
    const handleRegister = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const photoURL = form.photoURL.value
        const email = form.email.value
        const password = form.password.value
        const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        setError('')

        if (!passwordValidation.test(password)) {
            setError("Password should be at least 6 character with Small and Capital letters.")
            notify("Password should be at least 6 character with Small and Capital letters.")
            return
        }

        createUser(email, password)
            .then((result) => {
                // const newUser = {
                //     name,
                //     email,
                //     photoURL
                // }
                // create user in the database
                // fetch('https://rent-wheels-server-jet.vercel.app/users', {
                //     method: 'POST',
                //     headers: {
                //         'content-type': 'application/json'
                //     },
                //     body: JSON.stringify(newUser)
                // })
                //     .then(res => res.json())
                //     .then(data => {
                //         console.log('data after user save', data)
                //     })


                updateUserProfile({
                    displayName: name,
                    photoURL: photoURL
                })
                Swal.fire({
                    title: "Registration Successful. Welcome to Red Care",
                    icon: "success",
                    confirmButtonColor: "#F91617"
                });
                const user = result.user
                setUser(user)
                form.reset()
                navigate(location.state || '/')
            })
            .catch(() => {
                setError("Invalid Email")
                notify("Invalid Email")
            })
    }
    return (
        <div className="py-8 md:py-20 hero bg-base-200">
            <title>Registration</title>
            <div className="hero-content flex-col">
                <div className="text-center lg:text-center">
                    <h1 className="text-4xl md:text-5xl font-bold">Create Your <span className='text-primary'>Account</span> Now !</h1>
                    <p className="py-6 text-accent">
                        Register now and begin your great job.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                {/* name */}
                                <label>Name</label>
                                <input type="text" className="input w-full"
                                    name='name'
                                    required
                                    placeholder="Name" />

                                {/* photo */}
                                <label>Photo URL</label>
                                <input type="text" className="input w-full"
                                    required
                                    name='photoURL'
                                    placeholder="Photo URL" />

                                {/* email */}
                                <label>Email</label>
                                <input type="email" className="input w-full"
                                    name='email'
                                    required
                                    placeholder="Email" />

                                {/* password */}
                                <label>Password</label>
                                <div className='relative'>
                                    <input type={showPass ? 'text' : 'password'}
                                        name='password'
                                        required
                                        className="input w-full" placeholder="Password" />
                                    <p
                                        onClick={() => setShowPass(!showPass)}
                                        className='absolute top-3.5 right-5 cursor-pointer z-10'>{showPass ? <FaEyeSlash /> : <FaEye />}</p>
                                </div>
                                {
                                    error && <p className='text-red-500'>{error}</p>
                                }
                                <button
                                    type='submit'
                                    className="btn bg-primary mt-4 text-white hover:bg-secondary 
                                font-semibold">Register Now</button>
                            </fieldset>
                            <p className='pt-2'>Already have an Account ! <Link state={location.state} to='/login'><span className='text-blue-500 font-semibold hover:underline'>Login Now</span></Link></p>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Registration;