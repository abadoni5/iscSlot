import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex items-center justify-between">
        <div className="text-white text-3xl font-extrablack">ISC SLOTS</div>

        <div className="hidden md:flex space-x-4">
          <a href="/" className="text-white">
            Home
          </a>
          <a href="/slots" className="text-white">
            Slots
          </a>
          <a href="#" className="text-white">
            Coaching
          </a>
          <a href="/inventory" className="text-white">
            Inventory
          </a>
        </div>

        <div className="flex md:hidden space-x-4">
          <button className="text-white">
            <i className="fas fa-bars"></i>
          </button>
          <a href="#" className="text-white">
            Login
          </a>
        </div>

        <div className="hidden md:flex">
          <a href="#" className="text-yellow">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
