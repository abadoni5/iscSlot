'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Updated import statement
import NavSignUp from 'components/NavSignUp.jsx';
import styles from './page.module.css';
import img from 'public/landing.png';
import { supabase } from '/app/client.js';

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const fetchUsername = async () => {
            // Get user_id from the cookie
            const userId = document.cookie
                .split("; ")
                .find((row) => row.startsWith("userId"))
                ?.split("=")[1];

            if (userId) {
                // Fetch user data from Supabase based on user_id
                const { data, error } = await supabase
                    .from("your_users_table_name") // Replace with your actual users table name
                    .select("username")
                    .eq("user_id", userId)
                    .single();

                if (data) {
                    setUsername(data.username);
                } else if (error) {
                    console.error("Error fetching username:", error.message);
                }
            }
        };

        fetchUsername();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const handleChange = (event) => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            };
        });
    };

    async function fetchUserId(email) {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('user_id')
                .eq('email', email);

            if (error) {
                console.error('Error fetching user ID:', error.message);
                return null;
            } else {
                if (data && data.length > 0) {
                    console.log('User ID fetched:', data[0].user_id);
                    return data[0].user_id;
                } else {
                    console.error('User ID not found.');
                    return null;
                }
            }
        } catch (error) {
            console.error('Error fetching user ID:', error.message);
            return null;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                throw error;
            } else {
                const userId = await fetchUserId(formData.email);

                console.log('User ID from users table:', userId);

                if (userId !== null) {
                    document.cookie = `userId=${userId}`;
                }

            }
            router.push('/');
        } catch (error) {
            alert(error.error_description || error.message);
        }
    };

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
            router.push('/signup');
        } catch (error) {
            console.error('Sign Out Error:', error);
        }
    };

    const styling = {
        background: '#FEF7ED',
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
                <NavSignUp />
            </div>

            <div className='flex items-center justify-center mt-28'>
                <div className={`border rounded p-8 bg-white ${styles.mainClass}`}>
                    <h2 className='text-4xl text-center font-semibold mt-12 mb-12 text-emerald-900'>Login</h2>
                    {username && <p className='text-emerald-500'>Hi, {username}</p>}
                    <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                        <input
                            placeholder='Email'
                            name='email'
                            onChange={handleChange}
                            className='mb-4 p-3 border border-gray-300 rounded-md w-64'
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            onChange={handleChange}
                            className='mb-4 p-3 border border-gray-300 rounded-md w-64'
                        />
                        <button
                            type='submit'
                            className='bg-emerald-500 text-white p-3 rounded-md hover:bg-emerald-600 w-64'
                        >
                            Login
                        </button>
                        <button onClick={signOut} className='mt-4 text-emerald-500 hover:underline cursor-pointer'>
                            Sign Out
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
