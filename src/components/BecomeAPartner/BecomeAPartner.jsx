import React from 'react';
import { Link } from 'react-router';

const BecomeAPartner = () => {
    return (
        <div>
            <section className="w-11/12 mx-auto relative py-20 px-4 overflow-hidden bg-base-200 mt-16 mb-16">

            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
            
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    
            
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-base-300">
                            <img 
                                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80" 
                                alt="Local Chef" 
                                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700" 
                            />
                        </div>
                        
                        <div className="absolute -bottom-6 -left-6 w-2/3 h-2/3 bg-[#f97416] rounded-3xl -z-0 opacity-20"></div>
                    </div>

                  
                    <div className="w-full lg:w-1/2" style={{ fontFamily: '"Roboto Slab", serif' }}>
                        <span className="text-[#f97416] font-bold tracking-widest uppercase text-sm mb-4 block">Work From Home</span>
                        <h2 className="text-3xl md:text-3xl font-bold mb-6 leading-tight">
                            Turn Your Kitchen Into a <span className="text-[#f97416]">Business</span>
                        </h2>
                        
                        <p className="text-lg text-base-content/70 mb-8 font-sans">
                            Join our community of passionate home cooks. Share your secret family recipes, serve your neighbors, and build a brand—all from the comfort of your own kitchen.
                        </p>

                        
                        <ul className="space-y-4 mb-10 font-sans">
                            <li className="flex items-center gap-3">
                                <div className="p-1 bg-orange-100 rounded-full"><svg className="w-5 h-5 text-[#f97416]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                <span className="font-medium">Set your own prices & menu</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="p-1 bg-orange-100 rounded-full"><svg className="w-5 h-5 text-[#f97416]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                <span className="font-medium">Flexible hours—cook when you want</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="p-1 bg-orange-100 rounded-full"><svg className="w-5 h-5 text-[#f97416]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                <span className="font-medium">Secure weekly payouts</span>
                            </li>
                        </ul>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/about" className="btn my-btn text-white btn-lg px-8 border-none shadow-lg shadow-orange-200">
                                Learn More
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
        </div>
    );
};

export default BecomeAPartner;