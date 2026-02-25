import React from 'react';
import { Link } from 'react-router';


const Hero = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-base-200" style={{ fontFamily: '"Roboto Slab", serif' }}>
            {/* DaisyUI Carousel / Slider */}
            <div className="carousel w-full h-full">
                
                <div id="slide1" className="carousel-item relative w-full">
                    <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80" className="w-full object-cover brightness-50" alt="Fresh Home Cooked Food" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Authentic Home Flavors</h1>
                        <p className="text-lg md:text-xl mb-8 max-w-xl drop-shadow-md font-sans">Experience meals prepared with love by the finest home chefs in your neighborhood.</p>
                        <Link to="/meals" className="btn my-btn text-white border-none px-10 btn-lg shadow-xl">Browse Menu</Link>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
                        <a href="#slide3" className="btn btn-circle btn-ghost text-white">❮</a>
                        <a href="#slide2" className="btn btn-circle btn-ghost text-white">❯</a>
                    </div>
                </div>

                
                <div id="slide2" className="carousel-item relative w-full">
                    <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80" className="w-full object-cover brightness-50" alt="Chef at Work" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Become a Local Chef</h1>
                        <p className="text-lg md:text-xl mb-8 max-w-xl drop-shadow-md font-sans">Turn your passion for cooking into a rewarding journey. Share your heritage today.</p>
                        <Link to="/auth/register" className="btn my-btn text-white border-none px-10 btn-lg shadow-xl">Join the Bazaar</Link>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
                        <a href="#slide1" className="btn btn-circle btn-ghost text-white">❮</a>
                        <a href="#slide3" className="btn btn-circle btn-ghost text-white">❯</a>
                    </div>
                </div>

                
                <div id="slide3" className="carousel-item relative w-full">
                    <img src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1200&q=80" className="w-full object-cover brightness-50" alt="Fresh Ingredients" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Fresh. Local. Healthy.</h1>
                        <p className="text-lg md:text-xl mb-8 max-w-xl drop-shadow-md font-sans">Ditch the fast food. Choose wholesome meals made with fresh, local ingredients.</p>
                        <Link to="/about" className="btn bg-white text-black hover:bg-gray-200 border-none px-10 btn-lg shadow-xl">Our Story</Link>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
                        <a href="#slide2" className="btn btn-circle btn-ghost text-white">❮</a>
                        <a href="#slide1" className="btn btn-circle btn-ghost text-white">❯</a>
                    </div>
                </div>

            </div>
        </section>
  );
};

export default Hero;