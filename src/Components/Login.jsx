import React from 'react'
import { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import {  Autoplay } from "swiper/modules";
import "swiper/css";

export default function Login() {

  const [images, setImages] = useState([
    "/src/assets/cadqa login.svg",
    "/src/assets/loginPage1.svg",
    "/src/assets/loginPage 2.svg",
    "/src/assets/loginPage 3.svg",
  ]);

  return (
    <>

    <header>

      <div  style={{backgroundColor:'var(--primary-color)'}} className='flex justify-between text-white text-center px-2 h-20 max-lg:h-22 max-sm:block max-sm:h-54' >

       <div className='p-4 max-lg:pr-4'>
            <h1 className='text-xl'>جامعة مؤتة :: نحو بيئة تعليمية افضل</h1>
        </div>

        <div className='p-4 max-lg:pr-4'>
        <h1 className='text-xl'>نظام مركز التطوير الاكاديمي و ضمان الجودة</h1>
        </div>

        <div className='p-2 phone max-lg:pr-4 max-lg:w-76 max-lg:mt-2'>
            <h1 style={{letterSpacing:'2px',direction:'ltr'}} className='text-lg english-text '><i className="fa-solid fa-phone"/> +(962) 3 2372380 </h1>
            <h1 className='text-lg english-text'> <a href="mailto:cadqac@mutah.edu.jo">cadqac@mutah.edu.jo</a> <i className="fa-solid fa-envelope"/></h1>
        </div>

      </div>
      
    </header>

    <section>
      <div  className="flex justify-between max-sm:block ">

        <div style={{width:'600px',height:'740px',backgroundColor:'#2B0B0B'}} className="slider-img  w-1/2  relative">

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                style={{ height: "740px",width:'600px'}}
                className=''
                src={src}
                
              />
            </SwiperSlide>
          ))}
        </Swiper>

          <div style={{width:'600px',height:'740px',backgroundColor:'#2B0B0B'}} className='title-slider absolute opacity-70  z-10 top-0'>
          <h1 style={{lineHeight:'1.4'}} className='text-6xl font-bold text-white mt-52 ml-10  text-center max-xl:ml-0 max-lg:text-5xl '>نظام مركز التطوير الاكاديمي وضمان الجودة</h1>
          </div>

        </div>

        <div style={{backgroundColor:'#F0EFEF',border:'solid 2px #CFCFCF',width:'480px',height:'550px'}} className='login-form text-center ml-20 mt-20  rounded-3xl w-1/2 max-xl:ml-16 max-lg:ml-8 max-sm:mr-8 max-sm:mb-8'>
          <img className='w-24 mr-48 mt-8 bg-gray-400 max-xl:mr-36 max-lg:mr-30' src="/src/assets/logo cadqa.png" alt="" />
          <h1 style={{color:'#3F3F3F'}} className='text-4xl english-text'>Log Into</h1>
          <h1 style={{color:'#3F3F3F'}} className='text-4xl english-text'>CADQA System</h1>

          <form action="">
            <input  className='w-76 h-14  mt-4 ltr bg-white rounded-xl px-2 outline-gray-300 ' placeholder='Username' type="text" />
            <input  className='w-76 h-14  mt-4 ltr bg-white rounded-xl px-2 outline-gray-300 ' placeholder='Password' type="password" />

            <h2 style={{color:'#4C5A88'}} className='mt-2 text-sm english-text text-end ml-22 transition-opacity hover:opacity-80 max-xl:ml-14 max-lg:ml-8'><a href="">?forgot your password</a></h2>

            <button style={{backgroundColor:'var(--primary-color)'}} className='w-40 h-14 mt-8 text-xl rounded-xl  text-white cursor-pointer transition-opacity hover:opacity-80'>تسجيل الدخول</button>
          </form>

        </div>

      </div>
    </section>

    <footer>
      <div  style={{backgroundColor:'var(--secondary-color)'}} className='footer ltr h-52 text-white  text-lg flex  justify-between max-lg:h-60 max-sm:grid max-sm:grid-cols-1 max-sm:justify-items-center'>

         <div className="logo-footer  w-1/5 mt-10 px-2 max-sm:w-auto">

         <div style={{}} className='w-32  h-32 ml-10 px-2 rounded-full max-lg:ml-0'>
          <img className='w-2 h-2 rounded-full hidden' src="/src/assets/cadqa logo.svg" alt="" />
         </div>

         </div>

        <div className='contact-us w-2/5 mt-4 px-2 max-sm:w-auto'>
        <h1 className='text-2xl font-bold english-text'>Contact Us :</h1>

        <ul>
          <li className='mt-4 text-xl'><i className="fa-solid fa-location-dot mr-2"/>  الاردن-الكرك-الرمز البريدي (61710)</li>
          <li className='mt-4 text-xl'><i className="fa-solid fa-phone mr-2"/> +(962) 3 2372380 </li>
          <li className='mt-4 text-xl'><i className="fa-solid fa-envelope mr-2"/> <a href="mailto:cadqac@mutah.edu.jo">cadqac@mutah.edu.jo</a></li>
        </ul>

        </div>

        <div className='sub-number w-1/5 mt-4 px-2 max-sm:w-full max-sm:ml-20'>
        <h1 className='text-2xl font-bold'>الارقام الفرعية :</h1>

        <ul>
          <li className='mt-4 text-xl'>مدير المركز: 6150</li>
          <li className='mt-4 text-xl '>السكرتير: 6149</li>
          <li className='mt-4 text-xl '>مساعد المدير: 3289</li>
        </ul>

        </div>

        <div className='follow-us w-1/5 mt-4 px-2 max-sm:w-full max-sm:ml-20'>
        <h1 className='mb-4 text-2xl font-bold english-text'>Follow Us :</h1>
        <a href=""><img className='w-16 ' src="/src/assets/facbook.png" alt="" /></a>

        </div>

      </div>

      <div style={{backgroundColor:'var(--thierd-color)',direction:'ltr'}} className="copy h-24 text-white text-center  flex flex-col justify-center p-4 max-sm:h-32">

      <h1 className="mt-2 text-xl opacity-80 english-text max-sm:px-4"> Copyright © 2024 - Developed By : </h1>
      <h2 className="text-white text-xl font-bold mt-2 mb-2 english-text  max-sm:px-8"> Saif Hammad , Mustafa Nasser  ,Eman Maaita ,Saif Shboul</h2>


      </div>
    </footer>
      
    </>
  )
}
