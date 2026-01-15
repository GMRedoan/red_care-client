import { Link } from "react-router";
import hero from "../../assets/hero2.avif";
import { MdJoinFull } from "react-icons/md";
import { LuUserSearch } from "react-icons/lu";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import scroll from '../../assets/Scroll Down Animation.json'


const Banner = () => {
  const [showScrollIcon, setShowScrollIcon] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPoint = window.innerHeight * 0.35;
      if (scrollPosition > triggerPoint) {
        setShowScrollIcon(false);
      } else {
        setShowScrollIcon(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section data-aos="zoom-in" id="banner-section"
      className="relative text-white 
  bg-cover bg-center 
  bg-no-repeat 
  py-24 md:py-36 
  bg-scroll md:bg-fixed"
      style={{ backgroundImage: `url(${hero})` }}>
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative container mx-auto text-center px-5 py-12">
        <h1 className="text-4xl md:text-6xl font-bold leading-snug">
          Save Lives Today With Just One <br /> Simple And
          <span className="text-primary red-glow"> Powerful</span> Blood Donation
        </h1>

        <p className="mt-6 text-gray-300 max-w-3xl mx-auto">
          Every drop counts. Join Red Care in making blood donation faster, easier,
          and more accessible for everyone in critical need.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link to='registration' className="btn bg-base-100 border-0 rounded-md font-semibold hover:bg-base-300 hover:text-base-200">
            Join as a donor <MdJoinFull size={20} className="animate-floatSlow"/>
          </Link>

          <Link to='/search' className="btn btn-primary text-white rounded-md font-semibold hover:bg-white hover:text-black border-0">
            Search Donors <LuUserSearch size={16} className="animate-pulse"/>
          </Link>
        </div>
        <div className="hidden md:block">
          {
            showScrollIcon ? <div className="mt-10 absolute flex flex-col justify-center items-center left-1/2 transform -translate-x-1/2 animate-floatSlow">
                <Lottie
                animationData={scroll}
                color=""
                loop={true}
                autoplay={true}
                className="w-13 text-red-600" />
            </div> : <div className="mt-10 absolute flex flex-col justify-center items-center left-1/2 transform -translate-x-1/2 animate-floatSlow">
              <Lottie
                animationData={scroll}
                loop={true}
                autoplay={true}
                className="w-13 rotate-180" />
            </div>
          }
        </div>
      </div>
    </section>
  );
};

export default Banner;
