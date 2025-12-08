import * as Icons from "react-icons/fa6";

 
const OurDonationCard = ({donation}) => {
  const IconComponent = Icons[donation.icon] || Icons.FaRegClipboard
    return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl duration-300">
      
       <div className="relative h-60 w-full">
        <img
          src={donation.image}
          alt={donation.title}
          className="w-full h-full object-cover"
        />

         <div className="absolute bottom-0 right-0 bg-red-600/85 px-7 py-5 rounded-tl-xl">
          <span className="text-white text-3xl font-extrabold leading-none">
            {donation.number}
          </span>
        </div>
      </div>

       <div className="p-6">
        <h2 className="text-2xl font-extrabold tracking-wide text-gray-900 flex items-center gap-3 mb-3">
          <IconComponent className="text-red-600 text-3xl" />
          {donation.title}
        </h2>

        <p className="text-gray-600 leading-relaxed text-[15px]">
          {donation.description}
        </p>
      </div>
    </div>    );
};

export default OurDonationCard;