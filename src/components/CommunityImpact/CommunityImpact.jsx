import React from 'react';

const CommunityImpact = () => (
    <section className="w-11/12 mx-auto py-16 bg-base-200" style={{ fontFamily: '"Roboto Slab", serif' }}>
        <div className="max-w-4xl mx-auto px-4 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-16 underline decoration-[#f97416] underline-offset-8 mt-16">Local Dreams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="p-8 bg-base-100 rounded-2xl shadow-lg border-l-8 border-[#f97416]">
                    <h3 className="text-3xl font-bold text-[#f97416] mb-2">TK 0</h3>
                    <p className="font-bold uppercase tracking-widest text-xs opacity-60 mb-4 font-sans">Fees for new Chefs</p>
                    <p className="text-sm font-sans">We take 0% commission from new chefs for their first 30 days to help them start their business.</p>
                </div>
                <div className="p-8 bg-base-100 rounded-2xl shadow-lg border-l-8 border-[#f97416]">
                    <h3 className="text-3xl font-bold text-[#f97416] mb-2">95%</h3>
                    <p className="font-bold uppercase tracking-widest text-xs opacity-60 mb-4 font-sans">Earnings Kept</p>
                    <p className="text-sm font-sans">Local chefs keep 95% of every money you spend, directly supporting their families.</p>
                </div>
            </div>
        </div>
    </section>
);

export default CommunityImpact;