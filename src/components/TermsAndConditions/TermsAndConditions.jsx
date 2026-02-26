import React from 'react';
import { FaShieldAlt, FaRegHandshake, FaBalanceScale } from 'react-icons/fa';
import Navbar from '../../shared/Navbar/Navbar';
import Footer from '../../shared/Footer/Footer';

const TermsAndConditions = () => {
    return (
        <div>
            <Navbar></Navbar>
               <div className="min-h-screen bg-base-200 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-base-100 rounded-3xl shadow-xl p-8 md:p-12">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-emerald-600 mb-4">Terms & Conditions</h1>
                    <p className="text-base-content/60">Last updated: February 2026</p>
                </div>

                <div className="space-y-8 text-base-content/80 leading-relaxed">
                    <section>
                        <div className="flex items-center gap-3 mb-3">
                            <FaRegHandshake className="text-emerald-600 text-xl" />
                            <h2 className="text-xl font-bold text-base-content">1. Agreement to Terms</h2>
                        </div>
                        <p>By accessing Chef Bazaar, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access our fresh meal delivery services.</p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-3">
                            <FaShieldAlt className="text-emerald-600 text-xl" />
                            <h2 className="text-xl font-bold text-base-content">2. User Accounts</h2>
                        </div>
                        <p>When you create an account, you must provide accurate info. You are responsible for safeguarding your password. We reserve the right to terminate accounts that provide false information.</p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-3">
                            <FaBalanceScale className="text-emerald-600 text-xl" />
                            <h2 className="text-xl font-bold text-base-content">3. Orders & Refunds</h2>
                        </div>
                        <p>All meals are prepared fresh. Cancellations must be made 2 hours prior to delivery. Refunds are processed only in cases of incorrect items or quality issues reported within 1 hour of delivery.</p>
                    </section>

                    <div className="divider"></div>

                    <p className="text-sm italic">
                        Chef Bazaar reserves the right to modify these terms at any time. Continued use of the platform constitutes acceptance of new terms.
                    </p>
                </div>
            </div>
               </div>
            <Footer></Footer>
        </div>
       
    );
};

export default TermsAndConditions;