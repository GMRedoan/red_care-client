import { use, useEffect, useState } from 'react';
import logo from '../../assets/logo.png'
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../../Authentication/AuthContex';
import Swal from 'sweetalert2';
import { IoSearch } from 'react-icons/io5';
import Theme from '../../Shared/Theme';

const Navbar = () => {
    const { userInfo, logout, user } = use(AuthContext)
    const navigate = useNavigate()
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setShow(false);
            } else {
                setShow(true);
                setTimeout(() => {
                    4
                })
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);


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
        <nav className={`pr-4 md:px-6 flex justify-between items-center bg-base-100 sticky top-0 z-50 border-b border-primary ${show ? "translate-y-0" : "-translate-y-full"}`}>
            <div className="flex md:py-1">

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
                        {
                            user && <div className='flex items-center gap-1 text-lg'>
                                <li>  <NavLink to='funding'>Fund</NavLink> </li>
                            </div>
                        }
                        {
                            user && <div className='flex items-center gap-1 text-lg text-accent'>
                                <li>  <NavLink to='pp'>Privacy Policy</NavLink> </li>
                            </div>
                        }

                    </ul>
                </div>
                <Link to='/' className='-ml-4 md:ml-0 flex'>
                    <img className='w-[55px] h-[42px] md:w-[65px] md:h-[50px]' src={logo} alt="" />
                    <div className='-space-y-2 pt-2'>
                        <p className='text-md md:text-2xl font-semibold font-logo text-blue-400'>RED</p>
                        <p className='text-md md:text-xl text-primary ml-5 font-semibold font-logo'>Care</p>
                    </div>
                </Link>
            </div>
            <nav className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-5
                 ">
                    <div className='flex items-center gap-1 text-lg
                     '>
                        <NavLink to='/'><li>Home</li></NavLink>
                    </div>
                    <div className='flex items-center gap-1 text-lg'>
                        <NavLink to='donationReq'><li>Donation Requests</li></NavLink>
                    </div>
                    <div className='flex items-center gap-1 text-lg'>
                        <li>  <NavLink to='search'><IoSearch className='w-10' /></NavLink> </li>
                    </div>
                    {
                        user && <div className='flex items-center gap-1 text-lg'>
                          <NavLink to='funding'>  <li> Fund </li> </NavLink>
                        </div>
                    }
                    {
                        user && <div className='flex items-center gap-1 text-lg text-accent'>
                           <NavLink to='pp'> <li>  Privacy Policy</li> </NavLink>
                        </div>
                    }
                </ul>
            </nav>
            <div className='flex items-center gap-2'>
                <div>
                    <Theme></Theme>
                </div>
                {
                    user ?
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="m-1">
                                <img
                                    className="w-[30px] md:w-[42px] h-[30px] md:h-[42px] rounded-full cursor-pointer ring-2 ring-primary/40 hover:ring-primary transition"
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
                                        className="btn btn-sm btn-primary text-white w-full rounded-lg shadow hover:bg-secondary">Log Out
                                    </button>
                                </li>

                            </ul>
                        </div>
                        :
                        <Link to='/login' className="btn btn-sm btn-primary font-bold text-white hover:bg-secondary">Login / SignUp</Link>
                }
            </div>
        </nav>
    );
};

export default Navbar;