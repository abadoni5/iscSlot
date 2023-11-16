'use client'
import React, { useState, useEffect } from "react";
import { supabase } from 'app/client.js'; // Import your Supabase configuration

const Navbar = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    // Get userId from cookies (you may need to replace 'userId' with the actual cookie name)
    const userId = document.cookie.replace(
      /(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    if (userId) {
      try {
        // Fetch user data from the 'users' table using Supabase
        const { data, error } = await supabase
          .from('users')
          .select('name')
          .eq('user_id', userId)
          .single();

        if (error) {
          throw error;
        }
        setUsername(data.name);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const signOut = async () => {
    try {
      // Clear the userId cookie
      document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      // Sign out from Supabase
      await supabase.auth.signOut();
      window.location.reload();
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  return (
    <nav className={`bg-transparent p-4 pt-12 ${username ? 'bg-blue-500' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="logo.png" alt="Logo" className="h-8 w-8 mr-4 ml-8" />
          <a href="/">
            <div className="text-white text-4xl font-extrabold">ISC SLOTS</div>
          </a>
        </div>

        <div className="hidden text-xl md:flex space-x-4">
          <a href="/" className="text-white hover:text-gray-300 transition">
            Home
          </a>
          <a
            href="/slots"
            className="text-white hover:text-gray-300 transition"
          >
            Slots
          </a>
          <a
            href="/inventory"
            className="text-white hover:text-gray-300 transition"
          >
            Inventory
          </a>
          <a
            href="/booked"
            className="text-white hover:text-gray-300 transition"
          >
            My bookings
          </a>
        </div>

        <div className="flex md:hidden space-x-4">
          <button className="text-white">
            <i className="fas fa-bars"></i>
          </button>
          <a href="#" className="text-white hover:text-gray-300 transition">
            Login
          </a>
        </div>

        <div className="hidden md:flex items-center">
          {username ? (

            <button onClick={signOut} className="mr-8 text-amber-300 hover:bg-amber-300 hover:text-emerald-900 text-xl font-semibold bg-emerald-900 py-4 px-10 rounded-full border border-amber-300">{`Hi, ${username}`} &nbsp; <i className="fas fa-sign-out-alt"></i></button>
          ) : (
            <a href="/login">
              <button className="mr-10 text-amber-300 hover:bg-amber-300 hover:text-emerald-900 text-xl font-semibold bg-emerald-900 py-4 px-14 rounded-full border border-amber-300">
                Login
              </button>
            </a>
          )}
        </div>


      </div>
    </nav>
  );
};

export default Navbar;

