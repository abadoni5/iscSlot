'use client'
// Import the necessary dependencies
import { useState } from 'react';
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

    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });

            if (error) {
                throw error;
            }

            console.log(data);
            router.push('/'); // Navigate to the homepage after successful login
        } catch (error) {
            alert(error.error_description || error.message);
        }
    }

    async function signOut() {
        try {
            await supabase.auth.signOut();
            router.push('/signup'); // Navigate to the homepage after successful sign-out
        } catch (error) {
            console.error('Sign Out Error:', error);
        }
    }

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
