import React from 'react'

const mainText = () => {
    return (
        <div className='flex-col'>
            <div className='text-white text-3xl font-extrabold mb-3'>
                Awesome BOLD <br />
                Sports Quote Tasty
            </div>

            <div className='text-white'>
                Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit. Maxime mollitia, moles quas <br />
                vel sint commodi repudiandae consequuntur
            </div>

            <div>
                <button className='bg-amber-300 hover:bg-amber-400 text-emerald-900 font-medium px-8 py-3 rounded-full mt-4'>
                    Explore
                </button>
            </div>

        </div>

    )
}

export default mainText
