import Banner from '../../HomeLayout/Banner/Banner';
import OurMission from '../../HomeLayout/ExtraSections/OurMission';
import OurDonation from '../../HomeLayout/ExtraSections/OurDonation';
import OurMission2 from '../../HomeLayout/ExtraSections/OurMission2';
import ContactUs from '../../HomeLayout/ExtraSections/ContactUs';
import Services from '../../HomeLayout/ExtraSections/Services';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
import OurStatistics from '../../HomeLayout/ExtraSections/OurStatistics';
import Highlights from '../../HomeLayout/ExtraSections/Highlights';
import Blogs from '../../HomeLayout/ExtraSections/Blogs';

   
const Home = () => {
            useEffect(() => {
        AOS.init({
            duration: 500,
            once: true,
        });
    }, []);

    return (
        <div>
            <Banner></Banner>
            <OurDonation></OurDonation>
            <Highlights></Highlights>
            <OurMission></OurMission>
            <Services></Services>
            <OurStatistics></OurStatistics>
            <OurMission2></OurMission2>
            <Blogs></Blogs>
            <ContactUs></ContactUs>
         </div>
    );
};
 
export default Home;