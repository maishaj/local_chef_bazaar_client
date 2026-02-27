import React from "react";
import { Link } from "react-router";

const AppPromo = () => {
  return (
    <div className="w-11/12 mx-auto bg-base-100 overflow-hidden mt-24">
      <div className="px-4">
        <div className="bg-linear-to-br from-orange-50 to-white dark:from-base-200 dark:to-base-100 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-16 border border-orange-100 dark:border-white/5 relative">
          <div className="lg:w-3/5 text-center lg:text-left z-10">
            <div className="inline-block px-4 py-2 bg-orange-100 text-[#059669] rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Coming Soon to iOS & Android
            </div>
            <h2 className="text-3xl md:text-3xl font-extrabold mb-6 leading-tight text-neutral-900 dark:text-white">
              Your Favorite Home Kitchens, <br />
              <span className="text-[#059669]">In Your Pocket.</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 font-sans max-w-lg mx-auto lg:mx-0">
              Get the{" "}
              <span className="font-bold text-[#059669]">Chef Bazaar</span> app
              for real-time order tracking, direct chat with chefs, and
              exclusive loyalty rewards.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                className="flex items-center gap-2 bg-black text-white px-3 py-3 rounded-xl hover:scale-105 transition-transform"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg"
                  className="w-5"
                  alt="Google Play"
                />
                <div className="text-left">
                  <p className="text-[8px] uppercase opacity-60 leading-none">
                    Download on the
                  </p>
                  <p className="text-sm font-bold leading-none font-sans">
                    App Store
                  </p>
                </div>
              </a>
              <a
                href="https://play.google.com/store/games?hl=en"
                target="_blank"
                className="flex items-center gap-2 bg-black text-white px-3 py-3 rounded-xl hover:scale-105 transition-transform"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg"
                  className="w-5"
                  alt="Google Play"
                />
                <div className="text-left">
                  <p className="text-[8px] uppercase opacity-60 leading-none">
                    Get it on
                  </p>
                  <p className="text-sm font-bold leading-none font-sans">
                    Google Play
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:w-2/5 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#059669] rounded-full blur-[100px] opacity-20"></div>

            <div className="relative z-10 animate-float">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
                className="w-64 md:w-80 mx-auto rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(249,116,22,0.3)] border-[10px] border-white dark:border-base-300"
                alt="App Interface"
              />

              <div className="absolute top-10 -right-10 bg-white dark:bg-base-200 p-4 rounded-2xl shadow-xl border border-base-200 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">
                    ✓
                  </div>
                  <p className="text-xs font-bold font-sans">
                    Chef Maria is <br /> cooking!
                  </p>
                </div>
              </div>

              <div className="absolute bottom-20 -left-12 bg-white dark:bg-base-200 p-4 rounded-2xl shadow-xl border border-base-200 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 text-[#059669] rounded-full flex items-center justify-center text-lg">
                    ★
                  </div>
                  <p className="text-xs font-bold font-sans">4.9/5 Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 5s ease-in-out infinite;
                }
            `}</style>
    </div>
  );
};

export default AppPromo;
