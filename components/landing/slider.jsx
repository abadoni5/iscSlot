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
                    <SwiperSlide><a href='#'><img src="group2.png" alt='Sport Image' /> <p className='text-center text-2xl mt-4 mr-8 font-semibold'>Lorem Ipsum</p></a></SwiperSlide>
                    <SwiperSlide><a href='#'><img src="group3.png" alt='Sport Image' /> <p className='text-center text-2xl mt-4 mr-8 font-semibold'>Lorem Ipsum</p></a></SwiperSlide>
                    <SwiperSlide><a href='#'><img src="group4.png" alt='Sport Image' /> <p className='text-center text-2xl mt-4 mr-8 font-semibold'>Lorem Ipsum</p></a></SwiperSlide>
                    <SwiperSlide><a href='#'><img src="group5.png" alt='Sport Image' /> <p className='text-center text-2xl mt-4 mr-8 font-semibold'>Lorem Ipsum</p></a></SwiperSlide>
                    <SwiperSlide><a href='#'><img src="group6.png" alt='Sport Image' /> <p className='text-center text-2xl mt-4 mr-8 font-semibold'>Lorem Ipsum</p></a></SwiperSlide>
                </Swiper>
            </div>
        </>
    );
}
