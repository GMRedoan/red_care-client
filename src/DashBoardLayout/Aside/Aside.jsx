import { NavLink, Link } from "react-router";
import { FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";
import { LuGitPullRequestDraft } from "react-icons/lu";
import { IoCreateOutline } from "react-icons/io5";
import logo from '../../assets/bglogo.png';
import { ImCross } from "react-icons/im";

const Aside = ({ openSidebar, setOpenSidebar }) => {
    const menuItems = [
        { path: "/dashboard", label: "Dashboard", icon: <FaHome /> },
        { path: "/dashboard/profile", label: "My Profile", icon: <FaUser /> },
        { path: "/dashboard/my-donation-requests", label: "My Donation Req", icon: <LuGitPullRequestDraft /> },
        { path: "/dashboard/create-donation-request", label: "Create Donation Req", icon: <IoCreateOutline /> },
    ];

    return (
        <>
            {openSidebar && (
                <div
                    className="fixed inset-0 bg-opacity-40 md:hidden"
                    onClick={() => setOpenSidebar(false)}
                ></div>
            )}

            <aside className={`fixed md:static top-0 left-0 min-h-screen bg-base-200 shadow-2xl p-5 w-64 
                transform transition-transform duration-300 z-50
                ${openSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}>
                <button
                    className="md:hidden text-xl mb-4"
                    onClick={() => setOpenSidebar(false)}
                >
                    <ImCross className="text-primary" />
                </button>

                <div className="flex justify-center">
                    <img className="w-20 md:w-24" src={logo} alt="Logo" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-center my-4"><span className="text-blue-400">Donor</span> Dashboard</h2>

                <ul className="menu gap-2">
                    {menuItems.map(item => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                end={item.path === "/dashboard"}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 font-medium py-2 px-4 rounded-md 
                                    ${isActive ? "bg-primary text-white" : "hover:bg-base-300"}`
                                }
                            >
                                <span className="text-lg">{item.icon}</span>
                                {item.label}
                            </NavLink>
                        </li>
                    ))}

                    <li className="mt-110 md:mt-70">
                        <Link
                             
                             onClick={() => window.location.href = '/'}
                            className="flex items-center gap-3 py-2 px-4 rounded-md text-primary font-semibold hover:bg-base-200"
                        >
                            <FaSignOutAlt className="text-lg" /> Home
                        </Link>
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default Aside;
