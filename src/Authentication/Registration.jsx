import React, { use, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';
import { AuthContext } from './AuthContex';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxios from '../Hooks/UseAxios';

const Registration = () => {
    const axiosInstance = useAxios()
    const { districts, upazilas } = useLoaderData()
    const { createUser, updateUserProfile, setUser, googleLogin } = use(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || "/";
    const notify = (msg) => toast.error(msg);
    const [error, setError] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [showPass2, setShowPass2] = useState(false)
    const [uploading, setUploading] = useState(false)


    const handleRegister = async (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const avatar = form.Avatar
        const file = avatar.files[0]
        const email = form.email.value
        const bloodGroup = form.bloodGroup.value
        const district = form.district.value
        const upazila = form.upazila.value
        const password = form.password.value
        const confirmPassword = form.confirmPassword.value
        const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        setError('')

        if (!passwordValidation.test(password)) {
            setError("Password should be at least 6 character with Small and Capital letters.")
            notify("Password should be at least 6 character with Small and Capital letters.")
            return
        }
        if (password !== confirmPassword) {
            setError("Password and confirm Password should be similar.")
            notify("Password and confirm Password should be similar.")
            return
        }
        let photo = '';
        if (file) {
            setUploading(true);
            try {
                const formDataUpload = new FormData();
                formDataUpload.append("image", file);
                const res = await axios.post(
                    `https://api.imgbb.com/1/upload?&key=a61b7f4958aebb9ca0065ed632a5e5b9`,
                    formDataUpload
                );
                photo = res.data.data.display_url;
            } catch (err) {
                console.log(err);
                Swal.fire({
                    title: "Image upload failed",
                    icon: "error",
                });
                setUploading(false);
                return;
            }
            setUploading(false);
        }
        createUser(email, password)
            .then(async (result) => {
                const formData = {
                    name, email, bloodGroup, district, upazila, photo, status: 'active', role: 'donor'
                }
                const res = await axiosInstance.post('/users', formData)
                console.log(res.data)
                updateUserProfile({
                    displayName: name,
                    photoURL: photo
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
            <title>Registration</title>
            <div className="hero-content flex-col">
                <div className="text-center lg:text-center">
                    <h1 className="text-4xl md:text-5xl font-bold">Create Your <span className='text-primary'>Account</span> Now !</h1>
                    <p className="py-6 text-accent">
                        Register now and begin your great job.
                    </p>
                </div>
                <div className="card bg-base-200 w-full max-w-4xl shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">

                                <div className='md:grid grid-cols-2 gap-10'>
                                    <div>
                                        {/* name */}
                                        <label>Name</label>
                                        <input type="text" className="input w-full"
                                            name='name'
                                            required
                                            placeholder="Name" />

                                        {/* photo */}
                                        <label>Avatar</label>
                                        <input type="file" className="input w-full"
                                            required
                                            name='Avatar'
                                            placeholder="Avatar" />

                                        {/* email */}
                                        <label>Email</label>
                                        <input type="email" className="input w-full"
                                            name='email'
                                            required
                                            placeholder="Email" />

                                        {/* BLOOD GROUP */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold">Blood Group</span>
                                            </label>

                                            <select name='bloodGroup'
                                                required
                                                className="select select-bordered w-full" defaultValue="">
                                                <option value="" disabled>Select Blood Group</option>
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                                <option value="O+">O+</option>
                                                <option value="O-">O-</option>
                                            </select>
                                        </div>

                                    </div>

                                    <div>

                                        {/* DISTRICT */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold">District</span>
                                            </label>

                                            <select name='district'
                                                required className="select select-bordered w-full" defaultValue="">
                                                <option value="" disabled>Select District</option>
                                                {
                                                    districts.map(district => <option key={district.id}>{district.name}</option>
                                                    )
                                                }
                                            </select>
                                        </div>

                                        {/* UPAZILA */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text font-semibold">Upazila</span>
                                            </label>

                                            <select name='upazila'
                                                required className="select select-bordered w-full" defaultValue="">
                                                <option value="" disabled>Select Upazila</option>
                                                {
                                                    upazilas.map(upazila => <option key={upazila.id}>{upazila.name}</option>
                                                    )
                                                }
                                            </select>
                                        </div>

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

                                        {/*confirm password */}
                                        <label>Confirm Password</label>
                                        <div className='relative'>
                                            <input type={showPass2 ? 'text' : 'password'}
                                                name='confirmPassword'
                                                required
                                                className="input w-full" placeholder="Retype Password" />
                                            <p
                                                onClick={() => setShowPass2(!showPass2)}
                                                className='absolute top-3.5 right-5 cursor-pointer z-10'>{showPass2 ? <FaEyeSlash /> : <FaEye />}</p>
                                        </div>
                                        <div className='mt-2'>
                                            {
                                                error && <p className='text-red-500 font-semibold'>{error}</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='md:col-span-3 flex justify-center gap-4'>
                                    <button
                                        type="submit"
                                        className="btn bg-primary text-white hover:bg-secondary font-semibold"
                                        disabled={uploading}
                                    >
                                        {uploading ? "Please Wait.." : "Register Now"}
                                    </button>
                                    <button
                                        onClick={handleGoogle}
                                        type='button'
                                        className="btn bg-white text-black border-[#e5e5e5]">
                                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                        Login with Google
                                    </button>
                                </div>
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