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
        <div className='grid grid-cols-5'>

            <button
                className="md:hidden pl-2 pt-2 text-primary text-xl"
                onClick={() => setOpenSidebar(true)}
            >
                <FaBars />
            </button>

            <div className='col-span-1'>
                <Aside openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

            </div>
            <div className="mx-4 mt-4 col-span-5 md:col-span-4 md:mt-40">
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoardLayout;
