import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import "swiper/css";
import { Swiper, SwiperSlide } from 'swiper/react';
import OurDonationCard from './OurDonationCard';
import { use } from 'react';

const donationPromise = fetch('donation.json').then(res => res.json())
const OurDonation = () => {
    const donations = use(donationPromise)
    return (
        <div>
            <div className='mx-4 text-center my-10 mt-20'>
                <h1 className="text-4xl md:text-6xl font-bold leading-snug">Simple Steps to Make a <span className='text-primary'>Big Impact</span>
                </h1>

                <p className="mt-6 text-accent">
                    A simple step-by-step journey designed to ensure safety, comfort, and meaningful impact.
                </p>
             </div>
            <div className='md:mx-37 py-20 border-t border-gray-300'>
                <Swiper
                    loop={true}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 30,
                        stretch: 1,
                        depth: 50,
                        scale: 0.75,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper">

                    {
                        donations.map(donation => <SwiperSlide className="w-[350px]! flex justify-center">
                            <OurDonationCard donation={donation}></OurDonationCard>
                        </SwiperSlide>
                        )
                    }
                </Swiper>
            </div >
        </div>
    );
};

export default OurDonation;