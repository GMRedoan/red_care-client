import React from "react";
import { MdBloodtype } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";

const OurStatics = () => {
  return (
    <section className="relative md:py-18 px-6 lg:px-28 bg-base-100 overflow-hidden">
  
      {/* Header */}
      <div data-aos='zoom-in' className="text-center mb-20">
        <div className="text-primary font-semibold tracking-[3px] uppercase mb-3 flex justify-center items-center gap-2">
          <span className="inline-block h-[3px] w-10 bg-primary rounded"></span>
          Live Impact
        </div>

        <h2 className="text-4xl lg:text-5xl font-extrabold text-base-300 mb-6">
          Blood Donation Insights
        </h2>

        <p className="text-accent max-w-3xl mx-auto text-lg">
          Visualizing how every donation contributes to saving lives across our
          nationwide blood support network.
        </p>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
         <div data-aos='zoom-in' className="flex flex-col items-center">
          <div className="relative w-64 h-64">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="110"
                stroke="rgba(239,68,68,0.2)"
                strokeWidth="18"
                fill="none"
              />
              <circle
                cx="128"
                cy="128"
                r="110"
                stroke="rgb(239,68,68)"
                strokeWidth="18"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 110}
                strokeDashoffset={2 * Math.PI * 110 * (1 - 0.78)}
                className="transition-all duration-2000 "
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <MdBloodtype className="text-primary text-4xl mb-2" />
              <span className="text-4xl font-extrabold text-base-300">
                78%
              </span>
              <p className="text-accent text-sm">
                Donation Fulfillment
              </p>
            </div>
          </div>
        </div>

        <div data-aos='zoom-in' className="space-y-8">
          <h3 className="text-2xl font-bold text-base-300 mb-6 flex items-center gap-2">
            <FaHeartbeat className="text-primary" />
            Blood Type Demand
          </h3>

          {[
            { type: "A+", value: 70 },
            { type: "B+", value: 55 },
            { type: "O+", value: 90 },
            { type: "AB+", value: 40 },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2 text-base-300 font-medium">
                <span>{item.type}</span>
                <span>{item.value}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-base-300/20 overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-primary to-red-400 rounded-full transition-all duration-1500"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStatics;
