import React from 'react'
import { useState,useEffect } from 'react'
import Sidebar_Academic_Staff from '../Sidebar/Sidebar_Academic_Staff';

export default function Academic_Staff_Home() {
 
      const [open, setOpen] = useState(window.innerWidth > 640); // مغلق  على الشاشات الصغيرة
        
          useEffect(() => {
            const handleResize = () => {
              if (window.innerWidth <= 640) {
                setOpen(false);   
              } else {
                setOpen(true);    
              }
            };
        
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
         }, []);     
      
  return (
    <>
    <section>
    <div className="academic-staff-page w-full flex justify-between">

         {/*  side bar */}
       
        <Sidebar_Academic_Staff open={open} setOpen={setOpen}/>

         {/*  الصفحة الرئيسية */}
        <div className={`academic-staff-home ${open ? 'mr-90 max-lg:mr-76' : 'mr-20 max-lg:mr-16'}  duration-200 flex-1 justify-items-center`}>

  
         {/*  محتوى الصفحة الرئيسية  */}
        <div className="academic-staff-home-content mb-10 title w-full grid grid-cols-1  ">

           {/*  الشهادات */}
        <h1  className=' text-center text-[#540C0F] mt-20 mb-20 relative text-4xl font-bold max-sm:mb-16 '>الشهادات</h1> 
        <div className='certificates  grid grid-cols-3  max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-y-20  justify-items-center '> 
          
          <div  className="relative bg-[#611013] w-38 h-38  text-white rounded-2xl flex items-center justify-center rotate-45 shadow-lg cursor-pointer hover:scale-105 duration-300">
            <span className="-rotate-45">شهادة بكالوريوس</span>
          </div>
          <div  className="relative bg-[#611013] w-38 h-38  text-white rounded-2xl flex items-center justify-center rotate-45 shadow-lg cursor-pointer hover:scale-105 duration-300 ">
            <span className="-rotate-45">شهادة ماجستير</span>
          </div>
          <div className="relative bg-[#611013] w-38 h-38   text-white rounded-2xl flex items-center justify-center rotate-45 shadow-lg cursor-pointer hover:scale-105 duration-300 max-lg:col-span-2 max-sm:col-span-1 max-lg:text-center">
            <span className="-rotate-45">شهادة دكتوراه</span>
          </div>

          </div>

           
           {/*  الكتب الرسمية   */}
          <h1  className=' text-center text-[#540C0F] mt-20 mb-20 relative text-4xl font-bold px-4  max-sm:mb-16 max-sm:mt-16 '>الكتب الرسمية</h1> 
          <div className='official-books grid grid-cols-2  max-sm:grid-cols-1 max-sm:gap-y-16 justify-items-center'>
          <div  className="relative bg-[#611013] w-38 h-38  text-white rounded-2xl flex items-center justify-center rotate-45 shadow-lg cursor-pointer hover:scale-105 duration-300 ">
            <span className="-rotate-45"> كتاب تعيين</span>
          </div>
          <div className="relative bg-[#611013] w-38 h-38  text-white rounded-2xl flex items-center justify-center rotate-45 shadow-lg cursor-pointer hover:scale-105 duration-300 ">
            <span className="-rotate-45">كتاب ترقية</span>
          </div>
          </div>
           
           {/*  الدورات  */}
          <h1  className=' text-center text-[#540C0F] mt-20 mb-20 relative text-4xl font-bold px-4  max-sm:mb-16 max-sm:mt-16'> الدورات</h1> 
          <div className='courses grid grid-cols-2  max-sm:grid-cols-1 max-sm:gap-y-16 justify-items-center'>
          <div  className="relative bg-[#611013] w-38 h-38  text-white rounded-2xl flex items-center justify-center rotate-45 shadow-lg cursor-pointer hover:scale-105 duration-300">
            <span className="-rotate-45"> دورة اوراكيل</span>
          </div>
          <div  className="relative bg-[#611013] w-38 h-38  text-white rounded-2xl flex items-center justify-center rotate-45 shadow-lg cursor-pointer hover:scale-105 duration-300">
            <span className="-rotate-45">دورة اختراق اخلاقي</span>
          </div>
          </div>

             {/*  كتب الاجازات  */}     
          <h1 className=' text-center text-[#540C0F] mt-20 mb-20 relative text-4xl font-bold px-4  max-sm:mb-16 max-sm:mt-16'>كتب الاجازات</h1> 
          <div className=' vaction-books mb-10 grid grid-cols-2  max-sm:grid-cols-1 max-sm:gap-y-16 justify-items-center '>
          <div className="relative bg-[#611013] w-38 h-38  text-white rounded-2xl flex items-center justify-center rotate-45 shadow-lg cursor-pointer hover:scale-105 duration-300">
            <span className="-rotate-45">كتاب إجازة مرضية </span>
          </div>
          <div  className="relative bg-[#611013] w-38 h-38  text-white rounded-2xl flex items-center justify-center rotate-45 shadow-lg cursor-pointer hover:scale-105 duration-300">
            <span className="-rotate-45"> كتاب إجازة امومة</span>
          </div>
          </div>

        </div>

        </div>

        </div>
    </section>
      
    </>
  )
}