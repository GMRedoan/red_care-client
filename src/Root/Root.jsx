import { Outlet, useLocation } from 'react-router';
import Navbar from '../HomeLayout/Navbar/Navbar';
import Footer from '../HomeLayout/Footer/Footer';
import { use, useEffect } from 'react';
import { AuthContext } from '../Authentication/AuthContex';
import Loading from '../Shared/Loading';

const Root = () => {
    const { loading } = use(AuthContext);
    // const [loading, setLoading] = useState(true)
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

//   const showLoader = loading || navigation.state === 'loading';


    if (loading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            {/* {
                showLoader && <Loading></Loading>
            } */}
        </div>
    );
};

export default Root;