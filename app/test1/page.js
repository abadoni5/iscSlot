'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from 'app/client.js'; // Import your Supabase configuration

const Page = () => {
    const [username, setUsername] = useState('');

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
            }
        }
    };
    
    const handleButtonClick = () => {
        // Log the username to the console on button click
        console.log('Username:', username);
    };

    return (
        <div>
            <p>Username: {username}</p>
            <button onClick={handleButtonClick}>Log Username</button>
        </div>
    );
};

export default Page;
