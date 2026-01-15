import { FaHeartbeat, FaHandsHelping, FaUserShield } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";

const highlights = [
  {
    id: 1,
    title: "Instant Life Connection",
    desc: "Real-time donor and patient matching ensures blood reaches those who need it without delay.",
    icon: <FaHeartbeat />,
  },
  {
    id: 2,
    title: "Safe & Verified Donors",
    desc: "Every donor is carefully verified to maintain medical safety and trust across the platform.",
    icon: <FaUserShield />,
  },
  {
    id: 3,
    title: "Emergency First Approach",
    desc: "Urgent blood requests are prioritized with rapid alerts to nearby compatible donors.",
    icon: <MdBloodtype />,
  },
  {
    id: 4,
    title: "Community Impact",
    desc: "A growing community of heroes saving lives together through voluntary blood donation.",
    icon: <FaHandsHelping />,
  },
];

const Highlights = () => {
  return (
    <section className="relative pb-20 md:py-22 px-6 lg:px-28 overflow-hidden">

      {/* Header */}
      <div data-aos='zoom-in' className="text-center mb-24">
        <div className="text-primary font-semibold tracking-[3px] uppercase mb-4">
          Platform Highlights
        </div>
        <h2 className="text-4xl lg:text-5xl font-extrabold text-base-300 mb-6">
          Life Moves Through Red Care
        </h2>
        <p className="text-accent max-w-3xl mx-auto text-lg">
          Not just features — a living system designed to move blood, hope, and
          humanity where it matters most.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-[3px] bg-linear-to-b from-primary via-red-400 to-primary animate-pulse z-10" />

        <div className="space-y-18 md:space-y-28">
          {highlights.map((item, index) => (
            <div
              key={item.id}
              className={`relative flex items-center ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-primary rounded-full shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-pulse z-20" />

              {/* Content */}
              <div data-aos='zoom-in'
                className={`max-w-md ${
                  index % 2 === 0 ? "ml-10 md:ml-0 md:text-right pr-12 pl-6 md:pl-0" : "mr-8 md:mr-0 text-left pl-12"
                } bg-base-200 md:bg-base-100 py-4 rounded-xl`}
              >
                <div className="flex items-center gap-3 mb-3 justify-start">
                  <span className="text-primary text-2xl red-glow">
                    {item.icon}
                  </span>
                  <h3 className="text-2xl font-bold text-base-300 red-glow">
                    {item.title}
                  </h3>
                </div>

                <p className="text-accent leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
