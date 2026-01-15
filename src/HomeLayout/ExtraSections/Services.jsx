import { FaHandHoldingMedical, FaHeartbeat, FaUsers } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";


const services = [
    {
        id: 1,
        title: "Blood Donation",
        desc: "Donate blood safely and help save lives through a secure and guided donation process.",
        icon: <MdBloodtype />,
    },
    {
        id: 2,
        title: "Emergency Requests",
        desc: "Quickly connect with donors during emergencies and ensure timely blood support.",
        icon: <FaHeartbeat />,
    },
    {
        id: 3,
        title: "Donor Community",
        desc: "Join a trusted community of verified donors committed to helping others with responsibility.",
        icon: <FaUsers />,
    },
    {
        id: 4,
        title: "Medical Support",
        desc: "We collaborate with medical professionals to ensure safe and ethical practices for enhancing more safety.",
        icon: <FaHandHoldingMedical />,
    },
];

const Services = () => {

    return (
        <section className="relative py-24 px-6 lg:px-28 bg-base-100 overflow-hidden">

            {/* Section Header */}
            <div data-aos="zoom-in" className="text-center mb-16">
                <div className="text-primary font-semibold tracking-[3px] uppercase mb-3 flex justify-center items-center gap-2">
                    <span className="inline-block h-[3px] w-10 bg-primary rounded"></span>
                    Our Services
                </div>

                <h2 className="text-4xl lg:text-5xl font-extrabold text-base-300 mb-5">
                    How We Help Save Lives
                </h2>

                <p className="text-accent max-w-2xl mx-auto text-lg">
                    Red Care provides essential blood donation services designed to connect
                    donors and patients quickly, safely, and transparently.
                </p>
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service) => (
                    <div data-aos='zoom-in' key={service.id}> 
                        <div
                            className="group relative bg-base-200 backdrop-blur-md border border-base-300
                       rounded-2xl p-8 text-center shadow-lg
                       transition-all duration-500
                       hover:scale-[1.03] hover:shadow-primary/30"
                        >
                            {/* Icon */}
                            <div
                                className="mx-auto mb-6 w-16 h-16 flex items-center justify-center
                         rounded-full bg-primary/10 text-primary text-3xl
                         transition-all duration-500
                         group-hover:bg-primary group-hover:text-white
                         group-hover:scale-110"
                            >
                                {service.icon}
                            </div>

                            <h3 className="text-xl font-bold text-base-300 mb-3">
                                {service.title}
                            </h3>

                            <p className="text-accent text-sm leading-relaxed mb-6">
                                {service.desc}
                            </p>

                            {/* Hover Glow Border */}
                            <div className="absolute inset-0 rounded-2xl border border-primary opacity-0 group-hover:opacity-100 transition"></div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;
