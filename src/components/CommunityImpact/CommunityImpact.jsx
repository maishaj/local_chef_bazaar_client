import React from "react";

const CommunityImpact = () => (
    <div className="w-11/12 mx-auto bg-white">
      <div className="mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-[#059669] uppercase tracking-widest mt-10">
            Community First
          </h2>
          <h2 className="text-3xl font-bold text-center mt-5 mb-10 underline decoration-[#059669] underline-offset-8">
        Empowering Local Dreams
        </h2>
          <div className="h-1 w-20 bg-[#059669] mx-auto rounded-full"></div>
        </div>

        {/* Stats Grid */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-start bg-emerald-50/40 p-10 rounded-3xl border border-emerald-100 transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
              <div className="rounded-lg bg-[#059669] p-3 mb-6 shadow-lg shadow-emerald-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <dt className="text-sm font-bold uppercase tracking-wider text-gray-500 font-sans">
                Launch Phase Support
              </dt>
              <dd className="mt-2 flex flex-col gap-2">
                <span className="text-5xl font-extrabold tracking-tight text-gray-900">TK 0</span>
                <span className="text-lg font-semibold text-[#059669]">Commission for New Chefs</span>
                <p className="mt-4 text-base leading-7 text-gray-600 font-sans">
                  We waive all commissions for new chefs during their first 30 days. Our mission is to lower the barrier to entry for local culinary talent.
                </p>
              </dd>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-start bg-emerald-50/40 p-10 rounded-3xl border border-emerald-100 transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
              <div className="rounded-lg bg-[#059669] p-3 mb-6 shadow-lg shadow-emerald-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <dt className="text-sm font-bold uppercase tracking-wider text-gray-500 font-sans">
                Fair Revenue Model
              </dt>
              <dd className="mt-2 flex flex-col gap-2">
                <span className="text-5xl font-extrabold tracking-tight text-gray-900">95%</span>
                <span className="text-lg font-semibold text-[#059669]">Direct Earnings Retention</span>
                <p className="mt-4 text-base leading-7 text-gray-600 font-sans">
                  Local chefs keep the vast majority of their sales. Every meal you purchase directly contributes to a neighbor's livelihood and family.
                </p>
              </dd>
            </div>

          </dl>
        </div>
      </div>
    </div>
);

export default CommunityImpact;