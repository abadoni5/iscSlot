import React from 'react'

const mainText = () => {
    return (
        <div className='flex-col ml-20 mt-48'>
            <div className='text-white text-6xl font-extrabold mb-3'>
                ISC Slot Booking <br />
                within a few taps!
            </div>

            <div className='text-white text-2xl'>
                Book sports slots and manage inventory effortlessly <br /> at SNU ISC from your mobile device!
            </div>

            <div>
                <a href='/login'>
                    <button className='bg-amber-300 hover:bg-amber-400 text-emerald-900 text-2xl font-medium px-16 py-4 rounded-full mt-8'>
                        Explore
                    </button>
                </a>
            </div>

        </div>

    )
}

export default mainText
