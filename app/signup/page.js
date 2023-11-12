'use client'
import React, { useState } from 'react';
import Navbar from 'components/Navbar.jsx';
import styles from './page.module.css';
import img from "public/landing.png";

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        // Handle the signup logic here
        console.log('Signing up with:', name, email, password);
        // You might want to make an API request to a backend for user registration
    };

    const styling = {
        background: "#FEF7ED",
        height: '100vh',
        backgroundImage: `url(${img.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: '-1',
    };

    return (
        <div style={styling}>
            <div>
                <Navbar />
            </div>

            <div className='flex items-center justify-center mt-28'>
                <div className={`border rounded p-8 bg-white ${styles.mainClass}`}>
                    <h2 className="text-4xl text-center font-semibold mt-12 mb-12 text-emerald-900">Sign Up</h2>
                    <form className="flex flex-col items-center">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mb-4 p-3 border border-gray-300 rounded-md w-64"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-4 p-3 border border-gray-300 rounded-md w-64"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-4 p-3 border border-gray-300 rounded-md w-64"
                        />
                        <button
                            type="button"
                            onClick={handleSignup}
                            className="bg-emerald-500 text-white p-3 rounded-md hover:bg-emerald-600 w-64"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
}
