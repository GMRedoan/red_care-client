import { Outlet } from 'react-router';
import Navbar from '../HomeLayout/Navbar/Navbar';
import Footer from '../HomeLayout/Footer/Footer';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;