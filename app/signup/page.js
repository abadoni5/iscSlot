"use client"
// import React, { useState } from 'react';
// import Navbar from 'components/Navbar.jsx';
// import img from "public/landing.png";
// import { supabase } from "/app/client.js";

// export default function Signup() {

//     const [formData, setFormData] = useState({
//         fullname: '', email: '', password: ''
//     })

//     function handleChange(event) {
//         setFormData((prevFormData) => {
//             return {
//                 ...prevFormData,
//                 [event.target.name]: event.target.value
//             }
//         })
//     }


//     async function handleSubmit(e) {
//         e.preventDefault()
//         try {
//             const { data, error } = await supabase.auth.signUp(
//                 {
//                     email: formData.email,
//                     password: formData.password,
//                     options: {
//                         data: {
//                             emailRedirectTo: 'https://localhost:3000/auth/callback',
//                             fullname: formData.fullname
//                         }
//                     }
//                 }
//             )
//             console.log(data, error)
//             alert("Check your email for the confirmation link")
//         }
//         catch (error) {
//             alert(error.error_description || error.message)
//         }
//     }

//     const styling = {
//         background: "#FEF7ED",
//         height: '100vh',
//         backgroundImage: `url(${img.src})`,
//         backgroundRepeat: 'no-repeat',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         zIndex: '-1',
//     };

//     return (
//         <div style={styling}>
//             <Navbar />

//             <div className='flex items-center justify-center mt-16'>
//                 <div className='w-full max-w-md bg-white p-8 rounded shadow-lg'>
//                     <h2 className='text-4xl text-center font-semibold text-emerald-900 mb-8'>Sign Up</h2>

//                     <form onSubmit={handleSubmit} className='flex flex-col items-center'>
//                         <input
//                             placeholder='Full Name'
//                             name='fullname'
//                             onChange={handleChange}
//                             className='mb-4 p-3 border border-gray-300 rounded-md w-64'
//                         />
//                         <input
//                             placeholder='Email'
//                             name='email'
//                             onChange={handleChange}
//                             className='mb-4 p-3 border border-gray-300 rounded-md w-64'
//                         />
//                         <input
//                             placeholder='Password'
//                             name='password'
//                             type='password'
//                             onChange={handleChange}
//                             className='mb-4 p-3 border border-gray-300 rounded-md w-64'
//                         />
//                         <button
//                             type='submit'
//                             className='bg-emerald-500 text-white p-3 rounded-md hover:bg-emerald-600 w-64'
//                         >
//                             Sign Up
//                         </button>
//                     </form>

//                     <p className='text-gray-600 text-center mt-4'>
//                         Already have an account?{' '}
//                         <a href='/login' className='text-emerald-500 hover:underline'>
//                             Log in
//                         </a>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState } from 'react';
import Navbar from 'components/Navbar.jsx';
import img from "public/landing.png";
import { supabase } from "/app/client.js";

export default function Signup() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: ''
    });

    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        });
    }

    async function insertUser(fullname, email) {
        try {
            const userData = {
                username: null,
                name: fullname,
                email: email,
                role: 'user', // Defaulting the role to 'user'
                // Add any additional user data fields here
            };

            console.log('Data to be inserted:', userData);

            const { data, error } = await supabase
                .from('users')
                .insert([
                    userData,
                ]);

            if (error) {
                console.error('Error inserting user data:', error);
            } else {
                if (data && data.length > 0) {
                    console.log('User data inserted:', data[0]);
                } else {
                    console.log('User data insertion successful, but no data returned.');
                }
            }
        } catch (error) {
            console.error('Error inserting user data:', error);
        }
    }


    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { user, error } = await supabase.auth.signUp(
                {
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            emailRedirectTo: 'https://localhost:3000/auth/callback',
                            fullname: formData.fullname
                        }
                    }
                }
            )

            if (error) {
                alert(error.error_description || error.message);
            } else {
                // Successful signup, insert user data into the 'users' table
                await insertUser(formData.fullname, formData.email);

                console.log('Signup successful:', user);
                console.log('User data inserted into users table');
                alert("Check your email for the confirmation link");
            }
        } catch (error) {
            alert(error.error_description || error.message);
        }
    }

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
            <Navbar />

            <div className='flex items-center justify-center mt-16'>
                <div className='w-full max-w-md bg-white p-8 rounded shadow-lg'>
                    <h2 className='text-4xl text-center font-semibold text-emerald-900 mb-8'>Sign Up</h2>

                    <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                        <input
                            placeholder='Full Name'
                            name='fullname'
                            onChange={handleChange}
                            className='mb-4 p-3 border border-gray-300 rounded-md w-64'
                        />
                        <input
                            placeholder='Email'
                            name='email'
                            onChange={handleChange}
                            className='mb-4 p-3 border border-gray-300 rounded-md w-64'
                        />
                        <input
                            placeholder='Password'
                            name='password'
                            type='password'
                            onChange={handleChange}
                            className='mb-4 p-3 border border-gray-300 rounded-md w-64'
                        />
                        <button
                            type='submit'
                            className='bg-emerald-500 text-white p-3 rounded-md hover:bg-emerald-600 w-64'
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className='text-gray-600 text-center mt-4'>
                        Already have an account?{' '}
                        <a href='/login' className='text-emerald-500 hover:underline'>
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
