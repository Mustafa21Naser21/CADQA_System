import React from 'react'
import { useState } from 'react';

export default function Academic_Staff_Interface() {

  const [open,setOpen]=useState(true);
  return (
    <>
    <section>
    <div className="academic-staff-page w-full flex justify-between">
         {/*  side bar */}
         <div style={{height:'100vh'}} className={` ${open ? 'w-90' :'w-20'} sidebar relative duration-300  text-white rounded-l-4xl`}>
        
        <div className="close-open-sidebar bg-white text-black w-8 h-8 rounded-full left-2 top-4 absolute cursor-pointer"
        onClick={()=> setOpen(!open)}>
        <i className={`fa-solid fa-arrow-right  text-xl font-bold mt-2 mr-2 duration-300 ${!open && 'rotate-180'}`}/>
        </div>
        <div className={`profile flex mt-6 duration-300 ${!open && 'scale-0'}`}>
            <div style={{fontSize:'80px'}} className='personal-photo w-36 h-32 rounded-full bg-white text-black mr-4'> <i className="fa-solid fa-user py-6 px-8"/> </div>
            <div className="name w-58 h-12 rounded-3xl translate-x-5 bg-white text-black text-lg font-bold p-2 mt-10 pr-4 "> <h1> د.رقية عامر الصرايرة</h1></div>
        </div>
        <div className={`sidebar-content ${open ? 'mt-10' : 'mt-0 translate-x-3 text-2xl'} mx-10 `}>

                <div className='border-b border-white flex  '>
                <i title='الصفحة الرئيسية' className="fa-solid fa-house cursor-pointer text-xl ml-4"/>
                <h2 className={`text-xl text-white mb-2 cursor-pointer  duration-300  ${!open && 'scale-0'} `}> الرئيسية</h2>           
                </div>

                <div className='border-b border-white mt-4 '>
                    <div className='flex'>
                    <i title='رفع ملف جديد' className="fa-solid fa-file-circle-plus cursor-pointer text-xl ml-4"/>
                    <h2 className={`text-xl text-white mb-2 cursor-pointer duration-300 ${!open && 'scale-0'} `}> رفع ملف جديد</h2>             
                    </div>
                    <div className='flex'>
                    <i title='تسليماتي السابقة' className="fa-solid fa-file-lines cursor-pointer text-xl ml-4 "/>
                    <h2 className={`text-xl text-white mb-2 cursor-pointer duration-300 ${!open && 'scale-0'} `}> تسليماتي السابقة</h2>
                    </div>
                </div>

                <div className='border-b border-white mt-4'>
                  <div className='flex'>
                  <i title=' تقارير و احصائيات' className="fa-solid fa-chart-simple cursor-pointer text-xl ml-4"/>
                  <h2 className={`text-xl text-white mb-2 cursor-pointer duration-300 ${!open && 'scale-0'} `}>تقارير و احصائيات</h2>
                  </div>
                  <div className='flex'>
                  <i title=' الاعلانات و التنبيهات' className="fa-solid fa-bullhorn cursor-pointer text-xl ml-4"/>
                  <h2 className={`text-xl text-white mb-2 cursor-pointer duration-300 ${!open && 'scale-0'} `}>الاعلانات و التنبيهات</h2>
                  </div>
                </div>

                <div className=' mt-4 flex'>
                <i title=' الاعدادات' className="fa-solid fa-gear cursor-pointer text-xl ml-4"/>
                <h2 className={`text-xl text-white mb-2 cursor-pointer  duration-300 ${!open && 'scale-0'} `}>الاعدادات</h2>
                </div>
            </div>
       </div>

         {/*  الصفحة الرئيسية */}
        <div className="academic-staff-home  w-3/4 grid grid-cols-1 justify-items-center">

         {/* خانة البحث */}
        <div class="search-bar mt-6  relative">

        <i className="fa-solid fa-magnifying-glass absolute top-5 ps-3 pointer-events-none"/>
        <i className="fa-solid fa-bars absolute top-5 left-6 cursor-pointer"/>
        <input type="text" className=" w-90 h-14 p-2 ps-10 text-sm bg-indigo-100 outline-0 rounded-4xl " placeholder="ابحث"  />  

        </div>
          
         {/*  محتوى الصفحة الرئيسية  */}
        <div className="home-content w-full grid grid-cols-1  ">

           {/*  الشهادات */}
        <h1 style={{color:'#540C0F'}} className=' text-center mt-20 mb-10 relative text-4xl font-bold  '>الشهادات</h1> 
          <div className='certificates  flex justify-evenly'>
          
          <div style={{backgroundColor:'#611013'}} className="relative w-38 h-38  text-white rounded-2xl flex items-center justify-center rotate-45 shadow-lg">
            <span className="-rotate-45">شهادة بكالوريوس</span>
          </div>
          <div style={{backgroundColor:'#611013'}} className="relative w-38 h-38  text-white rounded-2xl flex items-center justify-center rotate-45 shadow-lg">
            <span className="-rotate-45">شهادة ماجستير</span>
          </div>
          <div style={{backgroundColor:'#611013'}} className="relative w-38 h-38  text-white rounded-2xl flex items-center justify-center rotate-45 shadow-lg">
            <span className="-rotate-45">شهادة دكتوراه</span>
          </div>

          </div>
           
           {/*  الكتب الرسمية   */}
          <h1 style={{color:'#540C0F'}} className=' text-center mt-10 relative text-4xl font-bold px-4  mb-10 '>الكتب الرسمية</h1> 
          <div className='official-books flex justify-evenly'>
          <div style={{backgroundColor:'#611013'}} className="relative w-38 h-38  text-white rounded-2xl flex items-center justify-center rotate-45 shadow-lg">
            <span className="-rotate-45"> كتاب تعيين</span>
          </div>
          <div style={{backgroundColor:'#611013'}} className="relative w-38 h-38  text-white rounded-2xl flex items-center justify-center rotate-45 shadow-lg">
            <span className="-rotate-45">كتاب ترقية</span>
          </div>
          </div>
           
           {/*  الدورات  */}
          <h1 style={{color:'#540C0F'}} className=' text-center mt-10 relative text-4xl font-bold px-4  mb-10 '> الدورات</h1> 
          <div className='courses flex justify-evenly'>
          <div style={{backgroundColor:'#611013'}} className="relative w-38 h-38  text-white rounded-2xl flex items-center justify-center rotate-45 shadow-lg">
            <span className="-rotate-45"> دورة اوراكيل</span>
          </div>
          <div style={{backgroundColor:'#611013'}} className="relative w-38 h-38  text-white rounded-2xl flex items-center justify-center rotate-45 shadow-lg">
            <span className="-rotate-45">دورة اختراق اخلاقي</span>
          </div>
          </div>

             {/*  كتب الاجازات  */}     
          <h1 style={{color:'#540C0F'}} className=' text-center mt-10 relative text-4xl font-bold px-4  mb-10 '>كتب الاجازات</h1> 
          <div className=' vaction-books flex justify-evenly'>
          <div style={{backgroundColor:'#611013'}} className="relative w-38 h-38  text-white rounded-2xl flex items-center justify-center rotate-45 shadow-lg">
            <span className="-rotate-45">كتاب إجازة مرضية </span>
          </div>
          <div style={{backgroundColor:'#611013'}} className="relative w-38 h-38  text-white rounded-2xl flex items-center justify-center rotate-45 shadow-lg">
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
