import logo from "../../assets/bglogo.png";
import { FaPhoneAlt, FaClock, FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";

const ContactUs = () => {
    const handleContact = (e) => {
        e.preventDefault()
        Swal.fire({
            title: "Form Submitted Successfully",
            icon: "success",
            confirmButtonColor: "#F91617"
        })
        e.target.reset()
    }
    return (
        <div id="contact-section" className="w-full py-10 px-4">
            <div data-aos="zoom-in" className="text-center pb-20">
                <h1 className="text-4xl md:text-5xl font-bold leading-snug">
                    Get in <span className="text-primary">Touch</span> With Us
                </h1>

                <p className="mt-6 text-accent max-w-3xl mx-auto">
                    Reach out for inquiries, assistance, or collaboration. We're committed to providing quick and helpful responses.
                </p>
            </div>
            <div data-aos="zoom-in" className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

                <div className="bg-red-200 text-black p-10 rounded-xl shadow-lg hover:bg-red-300">
                    <h2 className="text-3xl font-bold mb-4">Connect With Our Team</h2>
                    <div className="font-semibold">
                        <p className="mt-6">House no: 63</p>
                        <p>Khan Shorok</p>
                        <p>Aftabnagar, Rampura, Dhaka 1100 </p>
                     </div>
                    <div className="space-y-4 mt-6">
                        <div className="flex items-center gap-3">
                            <FaPhoneAlt className="text-xl" />
                            <p>Telephone : 1800-2355-2356</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaClock className="text-xl" />
                            <p>Mon - Fri : 8:00am - 6:00pm</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <FaEnvelope className="text-xl" />
                            <p>contact@redcare.com</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <img className="md:w-50" src={logo} alt="" />
                    </div>
                </div>

                <div className="bg-base-2
                00 p-10 rounded-xl shadow-md">
                    <form onSubmit={handleContact} className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <input
                            type="text"
                            required
                            placeholder="Name*"
                            className="input input-bordered w-full"
                        />

                        <input
                            type="text"
                            placeholder="Last Name*"
                            className="input input-bordered w-full"
                        />

                        <input
                            type="email"
                            required
                            placeholder="Email*"
                            className="input input-bordered w-full"
                        />

                        <input
                            type="number"
                            required
                            placeholder="Phone*"
                            className="input w-full"
                        />

                        <input
                            type="text"
                            placeholder="Subject*"
                            className="input w-full input-bordered col-span-1 md:col-span-2"
                        />

                        <textarea
                            className="textarea textarea-bordered w-full h-40 col-span-1 md:col-span-2"
                            placeholder="Message*"
                        ></textarea>

                        <button className="btn btn-sm md:btn-md btn-primary text-white col-span-1 md:col-span-2 mt-2">
                            SUBMIT NOW
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
