import React from "react";

const CommunityImpact = () => (
  <div className="w-11/12 mx-auto bg-base-100 py-16 transition-colors duration-300">
    <div className="mx-auto px-6 lg:px-8">
      {/* Header Section */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-sm font-black leading-7 text-primary uppercase tracking-[0.3em]">
          Community First
        </h2>
        <h2 className="text-3xl font-bold text-center mb-16 underline decoration-[#059669] underline-offset-8 mt-16">
        Empowering Local Dreams
        </h2>
        <div className="h-1.5 w-24 bg-primary mx-auto rounded-full shadow-sm shadow-primary/20"></div>
      </div>

      {/* Stats Grid */}
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-10 gap-y-10 lg:max-w-none lg:grid-cols-2">
          
          {/* Stat 1 */}
          <div className="flex flex-col items-start bg-base-200/50 p-10 rounded-[2.5rem] border border-base-300 dark:border-primary/10 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 duration-500 group">
            <div className="rounded-2xl bg-primary p-4 mb-8 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <dt className="text-xs font-black uppercase tracking-widest text-base-content/50">
              Launch Phase Support
            </dt>
            <dd className="mt-4 flex flex-col gap-2">
              <span className="text-4xl font-black tracking-tighter text-base-content">TK 0</span>
              <span className="text-xl font-bold text-primary">Commission for New Chefs</span>
              <p className="mt-4 text-base leading-relaxed text-base-content/70 font-medium">
                We waive all commissions for new chefs during their first 30 days. Our mission is to lower the barrier to entry for local culinary talent.
              </p>
            </dd>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-start bg-base-200/50 p-10 rounded-[2.5rem] border border-base-300 dark:border-primary/10 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 duration-500 group">
            <div className="rounded-2xl bg-primary p-4 mb-8 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <dt className="text-xs font-black uppercase tracking-widest text-base-content/50">
              Fair Revenue Model
            </dt>
            <dd className="mt-4 flex flex-col gap-2">
              <span className="text-4xl font-black tracking-tighter text-base-content">95%</span>
              <span className="text-xl font-bold text-primary">Direct Earnings Retention</span>
              <p className="mt-4 text-base leading-relaxed text-base-content/70 font-medium">
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