import { Outlet } from 'react-router';
import Navbar from '../HomeLayout/Navbar/Navbar';
import Footer from '../HomeLayout/Footer/Footer';
import { use } from 'react';
import { AuthContext } from '../Authentication/AuthContex';
import Loading from '../Shared/Loading';

const Root = () => {
    const {loading} = use(AuthContext)
    if(loading){
        return <Loading></Loading>
    }
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;