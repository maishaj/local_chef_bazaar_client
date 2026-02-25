import React from 'react';
import { Link } from 'react-router';

const About = () => {
    return (
        <div className="bg-base-100 min-h-screen font-serif" style={{ fontFamily: '"Roboto Slab", serif' }}>
            
            <div className="hero bg-base-200 py-16">
                <div className="hero-content text-center">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-bold text-[#f97416] mb-4">Chef Bazaar</h1>
                        <p className="text-xl text-base-content/70">
                            Connecting your kitchen to your community. We bring the authentic taste of home-cooked meals straight to your table.
                        </p>
                    </div>
                </div>
            </div>

            
            <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#f97416] pl-4">Our Mission</h2>
                    <p className="text-lg text-base-content/80 leading-relaxed">
                        At Local Chef Bazaar, we believe that the best food isn't made in factories or giant restaurant chains—it’s made in homes. 
                        Our mission is to empower local home cooks (our Chefs) to share their passion and heritage while providing 
                        neighbors with healthy, fresh, and affordable alternatives to fast food.
                    </p>
                    
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="stats shadow bg-orange-50 dark:bg-orange-900/10 text-[#f97416]">
                            <div className="stat p-4">
                                <div className="stat-title text-xs uppercase font-bold">Local Chefs</div>
                                <div className="stat-value text-2xl">50+</div>
                            </div>
                        </div>
                        <div className="stats shadow bg-orange-50 dark:bg-orange-900/10 text-[#f97416]">
                            <div className="stat p-4">
                                <div className="stat-title text-xs uppercase font-bold">Daily Meals</div>
                                <div className="stat-value text-2xl">200+</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <img 
                        src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="Cooking at home" 
                        className="rounded-2xl shadow-2xl border-b-8 border-[#f97416]"
                    />
                </div>
            </div>


            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h2 className="text-4xl font-bold mb-6">Ready to taste the difference?</h2>
                <p className="mb-10 text-lg opacity-80 text-base-content/70">
                    Whether you're a hungry customer or a talented cook, there's a place for you at our bazaar.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/meals" className="btn my-btn text-white px-8 border-none">Browse Meals</Link>
                    <Link to="/auth/register" className="btn btn-outline border-[#f97416] text-[#f97416] hover:bg-[#f97416] hover:border-[#f97416] hover:text-white px-8">Become a Chef</Link>
                </div>
            </div>
        </div>
    );
};

export default About;