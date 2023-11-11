import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-transparent p-4 pt-12">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src="logo.png" alt="Logo" className="h-8 w-8 mr-4 ml-8" />
                    <div className="text-white text-4xl font-extrabold">ISC SLOTS</div>
                </div>

                <div className="hidden text-xl md:flex space-x-4">
                    <a href="/" className="text-white hover:text-gray-300 transition">Home</a>
                    <a href="/slots" className="text-white hover:text-gray-300 transition">Slots</a>
                    <a href="/coaching" className="text-white hover:text-gray-300 transition">Coaching</a>
                    <a href="/inventory" className="text-white hover:text-gray-300 transition">Inventory</a>
                </div>

                <div className="flex md:hidden space-x-4">
                    <button className="text-white">
                        <i className="fas fa-bars"></i>
                    </button>
                    <a href="#" className="text-white hover:text-gray-300 transition">Login</a>
                </div>

                <div className="hidden md:flex">
                    <button className='text-amber-300 hover:bg-opacity-90 text-xl font-semibold bg-emerald-900 py-4 px-16 rounded-full border border-amber-300 mr-16'>
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
