import React from 'react';
import { motion } from "framer-motion";
import heroImg from '../../assets/heroImg.jpg'
import { Link } from 'react-router';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Hero = () => {
  return (
    <section className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row w-full">

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl mr-5"
        >
          <motion.h1 variants={item} className="text-5xl font-bold">
            Homemade Food, <br /> Delivered Fresh
          </motion.h1>

          <motion.p variants={item} className="py-6">
            LocalChefBazaar connects you with trusted home chefs near you.
          </motion.p>

          <motion.div variants={item}>
            <Link to="/meals" className="btn my-btn text-white mr-3">
              Order Now
            </Link>
          </motion.div>
        </motion.div>

        <motion.img
          src={heroImg}
          alt="food"
          className="rounded-lg shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </section>
  );
};

export default Hero;