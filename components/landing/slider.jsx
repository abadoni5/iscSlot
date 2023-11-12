'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

export default function App() {
    return (
        <>
            <div className='ml-16'>
                <Swiper
                    slidesPerView={4}
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay]}
                    style={{ height: '380px' }} 
                    className="mySwiper"
                >
                    <SwiperSlide><a href='/slots'><img src="group2.png" alt='Athletics' /> <p className='text-center text-2xl mt-4 mr-8 font-semibold'>Athletics</p></a></SwiperSlide>
                    <SwiperSlide><a href='/slots'><img src="group3.png" alt='Football' /> <p className='text-center text-2xl mt-4 mr-8 font-semibold'>Football</p></a></SwiperSlide>
                    <SwiperSlide><a href='/slots'><img src="group4.png" alt='Kick Boxing' /> <p className='text-center text-2xl mt-4 mr-8 font-semibold'>Kick Boxing</p></a></SwiperSlide>
                    <SwiperSlide><a href='/slots'><img src="group5.png" alt='Basket Ball' /> <p className='text-center text-2xl mt-4 mr-8 font-semibold'>Bakset Ball</p></a></SwiperSlide>
                    <SwiperSlide><a href='/slots'><img src="group6.png" alt='Power Lifting' /> <p className='text-center text-2xl mt-4 mr-8 font-semibold'>Power Lifting</p></a></SwiperSlide>
                </Swiper>
            </div>
        </>
    );
}
