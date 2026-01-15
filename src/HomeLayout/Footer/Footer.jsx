import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from '../../assets/bglogo.png'

const Footer = () => {
    return (
        <footer data-aos="zoom-in" className="bg-linear-to-b from-black to-gray-900 text-gray-300 py-12">
            <div className="container mx-auto px-4">

                <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-center md:text-left">

                    <div>
                        <div className="flex">
                            <img className="w-[100px]" src={logo} alt="" />
                            <h2 className="text-3xl font-bold text-red-500 font-logo mt-2"> <span className="text-blue-400">Red <br /></span> Care</h2>

                        </div>
                        <p className="mt-3 text-gray-400">
                            Saving lives one drop at a time.
                            Join our mission to make blood donation easier and accessible.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-3 text-gray-300 cursor-pointer">
                            <li
                                onClick={() => {
                                    const section = document.getElementById("banner-section")
                                    if (section) {
                                        section.scrollIntoView({ behavior: "smooth" });
                                    } else {
                                        window.location.href = "/";
                                    }

                                }
                                }
                                className="hover:text-white"><a>Home</a></li>
                            <li
                                onClick={() => {
                                    const section = document.getElementById("aboutUs-section");

                                    if (section) {
                                        section.scrollIntoView({ behavior: "smooth" });
                                    } else {
                                        window.location.href = "/";
                                    }
                                }}
                                className="hover:text-white">
                                <a>About</a>
                            </li>
                            <li className="hover:text-white"><a href="/search">Find Donor</a></li>
                            <li className="hover:text-white"><a>Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Support</h3>
                        <ul className="space-y-3 text-gray-300">
                            <li className="hover:text-white"><a>Request Blood</a></li>
                            <li className="hover:text-white"><a>Testimonials</a></li>
                            <li className="hover:text-white"><a>FAQs</a></li>
                            <li className="hover:text-white"><a>Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
                        <div className="text-gray-300 space-y-2">
                            <p className="text-sm">✉️ support@redcare.com</p>
                            <p className="text-sm">📞 +880 1234 567 890</p>
                            <p className="text-sm">📍 Dhaka, Bangladesh</p>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
                        <div className="flex justify-center md:justify-start space-x-5 text-2xl">
                            <a href="#" className="hover:text-blue-400"><FaFacebookF /></a>
                            <a href="#" className="hover:text-pink-400"><FaInstagram /></a>
                            <a href="#" className="hover:text-blue-300"><FaXTwitter /></a>
                            <a href="#" className="hover:text-red-500"><FaYoutube /></a>
                        </div>
                    </div>

                </div>

                <div className="text-center border-t border-gray-700 mt-10 pt-5">
                    <p className="text-gray-500">
                        © {new Date().getFullYear()} Red Care — All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
