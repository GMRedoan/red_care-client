import { FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router";

const OurMission2 = () => {
    return (
        <section className="pt-40 md:py-20 px-6 lg:px-20">
            <div className="flex flex-col-reverse md:flex-row gap-10 items-center">

                <div className="relative w-full">
                    <div className="md:border-2 absolute -top-6 -left-6 w-full h-full border-primary rounded-xl"></div>

                    <img
                        src="https://i.ibb.co.com/jZhstdw8/vietnam-blood1-5ec258bd332e0.jpg"
                        alt="Red Care Blood Donation"
                        className="relative z-10 rounded-xl shadow-xl object-cover w-full h-[420px]"
                    />
                </div>

                <div>
                    <p className="text-primary font-semibold tracking-wider mb-2">
                        About Red Care
                    </p>

                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        We Believe That <span className="text-primary">Together</span>, We Can Save More Lives
                    </h2>

                    <p className="text-accent leading-relaxed mb-8">
                        Red Care is a dedicated blood-donation community committed to
                        connecting donors, volunteers, and healthcare providers. Every drop
                        of blood has the power to save a life, and our mission is to make
                        the donation process easier, safer, and more accessible for
                        everyone.
                        <br />
                        <br />
                        From emergency care to life-saving surgeries, thousands of patients
                        rely on donated blood daily. With your help, we ensure hospitals and
                        clinics have the support they need to protect and heal more lives.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">

                        <div className="flex items-center gap-2">
                            <FiCheckCircle className="text-green-600 text-2xl" />
                            <p className="font-medium text-gray-800">Emergency Blood Supply</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <FiCheckCircle className="text-yellow-600 text-2xl" />
                            <p className="font-medium text-gray-800">Support for Critical Patients</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <FiCheckCircle className="text-red-500 text-2xl" />
                            <p className="font-medium text-gray-800">Blood for Mothers & Newborns</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <FiCheckCircle className="text-green-800 text-2xl" />
                            <p className="font-medium text-gray-800">Medical & Surgical Needs</p>
                        </div>
                    </div>

                    <button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn btn-sm md:btn-md btn-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-secondary">
                        Learn More
                        <FiArrowRight className="text-xl" />
                    </button>
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">

                             <p className="py-4">Press ESC key or click the button below to close</p>

                            <div className="modal-action">
                                <form method="dialog">
                                     <button className="btn btn-primary text-white
                                     ">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </section>
    );
};

export default OurMission2;
