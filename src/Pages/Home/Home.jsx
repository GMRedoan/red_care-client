import Banner from '../../HomeLayout/Banner/Banner';
import OurMission from '../../HomeLayout/ExtraSections/OurMission';
import OurDonation from '../../HomeLayout/ExtraSections/OurDonation';
import OurMission2 from '../../HomeLayout/ExtraSections/OurMission2';
import ContactUs from '../ContactUs';
  
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurDonation></OurDonation>
            <OurMission></OurMission>
            <OurMission2></OurMission2>
            <ContactUs></ContactUs>
        </div>
    );
};
 
export default Home;