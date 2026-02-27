import React from "react";

const steps = [
  {
    title: "Choose a Chef",
    desc: "Browse profiles of local home cooks in your area.",
  },
  { title: "Order Fresh", desc: "Select your meal and pick a delivery time." },
  {
    title: "Enjoy Home Taste",
    desc: "Receive your meal hot and prepared with care.",
  },
];

const HowItWorks = () => (
  <div className=" w-11/12 mx-auto py-16 bg-base-200 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mt-16 mb-16 underline decoration-[#059669] underline-offset-8">
        Start Your Journey
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {steps.map((step, i) => (
          <div key={i} className="text-center relative">
            <div className="w-16 h-16 bg-[#059669] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
              {i + 1}
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-base-content/70 font-sans">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HowItWorks;
