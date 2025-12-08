import { Link } from "react-router";
import hero from "../../assets/hero2.avif";

const Banner = () => {
  return (
    <section
      className=" relative text-white 
  bg-cover bg-center 
  bg-no-repeat 
  py-24 md:py-32 
  bg-scroll md:bg-fixed"
      style={{ backgroundImage: `url(${hero})` }}>
       <div className="absolute inset-0 bg-black/60"></div>

       <div className="relative container mx-auto text-center px-5">
        <h1 className="text-4xl md:text-6xl font-bold leading-snug">
          Save Lives Today With Just One <br /> Simple And 
           <span className="text-primary"> Powerful</span> Blood Donation
        </h1>

        <p className="mt-6 text-gray-300 max-w-3xl mx-auto">
          Every drop counts. Join Red Care in making blood donation faster, easier,
          and more accessible for everyone in critical need.
        </p>

        <div className="mt-10 flex justify-center gap-5">
          <Link to='registration' className="btn btn-sm md:btn-md btn-primary px-8 py-3 rounded-md font-semibold border-0 hover:bg-white hover:text-black">
            Join as a donor
          </Link>

          <button className="btn btn-sm md:btn-md text-black px-8 py-3 rounded-md font-semibold hover:btn-primary hover:text-white">
            Search Donors
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
