import React from 'react';

const QualityTrust = () => {
    const features = [
        { title: "Verified Chefs", desc: "Every chef undergoes a 5-step background and kitchen check.", icon: "✅" },
        { title: "Fresh Ingredients", desc: "Meals are made to order using locally sourced produce.", icon: "🌿" },
        { title: "Eco-Friendly", desc: "We encourage biodegradable packaging for all our home deliveries.", icon: "📦" }
    ];

    return (
        <section className="w-11/12 mx-auto py-20 bg-base-100" style={{ fontFamily: '"Roboto Slab", serif' }}>
            <div className="max-w-6xl mx-auto px-4 mt-16">
                <div className="bg-orange-50 dark:bg-orange-950/10 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-orange-100 dark:border-orange-900/30">
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
                            Why Trust <span className="text-[#f97416]">Our Kitchens?</span>
                        </h2>

                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 font-sans">
                            We maintain the highest standards of hygiene and quality so you can enjoy home-cooked meals with peace of mind.
                        </p>

                        <div className="space-y-6">
                            {features.map((f, i) => (
                                <div key={i} className="flex gap-4">
                                    <span className="text-2xl">{f.icon}</span>
                                    <div>
                                    
                                        <h4 className="font-bold text-lg text-neutral-900 dark:text-white">
                                            {f.title}
                                        </h4>
                                    
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">
                                            {f.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <img 
                            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop" 
                            className="rounded-2xl shadow-xl" 
                            alt="Quality Check" 
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QualityTrust;