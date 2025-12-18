import { use } from 'react';
import logo from '../../assets/logo.png'
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../Authentication/AuthContex';
import Swal from 'sweetalert2';
import { IoSearch } from 'react-icons/io5';

const Navbar = () => {
    const { userInfo, logout, user } = use(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
            .then(() => {
                Swal.fire({
                    title: "You Logged Out Successfully",
                    icon: "success",
                    confirmButtonColor: "#F91617"
                });
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <nav className="pr-4 md:px-8 flex justify-between items-center bg-base-200 sticky top-0 z-50">
            <div className="flex md:py-3">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost mt-2 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-30 p-2 shadow space-y-2">
                        <div className='flex items-center gap-1 text-sm '>
                            <NavLink to='/'><li>Home</li></NavLink>
                        </div>
                        <div className='flex items-center gap-1 text-sm'>
                            <NavLink to='donationReq'><li>Donation Req.</li></NavLink>
                        </div>
                        <div className='flex items-center gap-1 text-sm'>
                            <li>  <NavLink to='search'><IoSearch className='w-10' /></NavLink> </li>
                        </div>
                    </ul>
                </div>
                <Link to='/' className='-ml-4 md:ml-0 flex'>
                    <img className='w-[65px] h-[50px] md:w-[65px] md:h-[50px]' src={logo} alt="" />
                    <div className='-space-y-2 pt-2'>
                        <p className='text-xl md:text-2xl font-semibold font-logo text-blue-400'>RED</p>
                        <p className='text-xl md:text-xl text-primary ml-5 font-semibold font-logo'>Care</p>
                    </div>
                </Link>
            </div>
            <nav className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-8
                 ">
                    <div className='flex items-center gap-1 text-lg '>
                        <NavLink to='/'><li>Home</li></NavLink>
                    </div>
                    <div className='flex items-center gap-1 text-lg'>
                        <NavLink to='donationReq'><li>Donation Requests</li></NavLink>
                    </div>
                    <div className='flex items-center gap-1 text-lg'>
                        <li>  <NavLink to='search'><IoSearch className='w-10' /></NavLink> </li>
                    </div>
                    <div className='flex items-center gap-1 text-lg'>
                        <li>  <NavLink to='funding'>Fund</NavLink> </li>
                    </div>


                </ul>
            </nav>
            {
                user ?
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="m-1">
                            <img
                                className="w-[42px] h-[42px] rounded-full cursor-pointer ring-2 ring-primary/40 hover:ring-primary transition"
                                src={userInfo?.photo}
                                alt="profile"
                            />
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-xl shadow-lg border border-primary w-36 py-4">
                            <Link to='/dashboard/profile'
                                className="font-semibold text-[18px] cursor-pointer pl-2 hover:text-blue-500">Dashboard
                            </Link>

                            <div className="divider my-1"></div>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-sm md:btn-md btn-primary text-white w-full rounded-lg shadow hover:bg-secondary">Log Out
                                </button>
                            </li>

                        </ul>
                    </div>
                    :
                    <Link to='/login' className="btn btn-sm md:btn-md btn-primary font-bold text-white hover:bg-secondary">Login / SignUp</Link>
            }
        </nav>
    );
};

export default Navbar;