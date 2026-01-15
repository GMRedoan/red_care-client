import React from 'react';
import { MdMarkEmailRead } from 'react-icons/md';
import { RiContactsFill } from 'react-icons/ri';

const OurMission = () => {
    return (
        <section
         className="md:py-24 px-10 lg:px-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                <div data-aos="zoom-in">
                    <div className="text-primary font-semibold tracking-[3px] uppercase mb-3 flex items-center gap-2">
                        <span className="inline-block h-[3px] w-10 bg-primary rounded"></span>
                        Our Mission
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-extrabold text-base-300 mb-6">
                        Changing Lives With Every Drop
                    </h2>

                    <p className="text-accent leading-relaxed text-lg max-w-xl mb-10">
                        Red Care was founded to improve the availability and safety of blood donations. We work to ensure that every donor is guided through a secure, transparent, and reliable process. With your help, we can reach more patients who depend on timely blood support.
                    </p>

                    <div className="flex gap-4">
                        <button onClick={() =>
                            document.getElementById("contact-section").scrollIntoView({ behavior: "smooth" })
                        } className="btn btn-sm md:btn-md btn-primary text-white font-semibold rounded-md hover:bg-white hover:text-black transition border-0">
                            Contact US <RiContactsFill size={14} />
                        </button>
                        <button onClick={() =>
                            document.getElementById("contact-section").scrollIntoView({ behavior: "smooth" })
                        } className="btn btn-sm md:btn-md text-base-200 bg-base-300 font-semibold rounded-md hover:text-primary transition md:px-6">
                            Email Us <MdMarkEmailRead size={18} />
                        </button>
                    </div>
                </div>

                <div data-aos="zoom-in" className="relative w-full">
                    <img
                        src="https://i.ibb.co.com/jvCcjy2m/iowa-04-jpg-img.jpg"
                        alt="Volunteer Presentation"
                        className="rounded-lg shadow-xl w-full h-auto"
                    />

                    <img
                        src="https://i.ibb.co.com/JFcvKX3W/26772-hd.jpg"
                        alt="Helping Hands"
                        className="right-[-26px] md:right-[-60px] absolute bottom-[-60px] w-2/3 rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>);
};

export default OurMission;