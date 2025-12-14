import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { AuthContext } from '../Authentication/AuthContex';
import Loading from '../Shared/Loading';
import Aside from './Aside/Aside';
import { FaBars } from "react-icons/fa";

const DashBoardLayout = () => {
    const { loading } = useContext(AuthContext);
    const location = useLocation();
    const [showLoader, setShowLoader] = useState(true);
    const [openSidebar, setOpenSidebar] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowLoader(false), 1000);
        return () => clearTimeout(timer);
    }, [loading]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    if (loading || showLoader) return <Loading />;

    return (
        <div className=''>

            <button
               className="pl-3 pt-3 text-primary text-2xl fixed top-0 left-0 z-50"
                onClick={() => setOpenSidebar(true)}
            >
                <FaBars />
            </button>

            <div>
                <Aside openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoardLayout;
