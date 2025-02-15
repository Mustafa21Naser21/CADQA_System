import React from 'react'
import { useState,useEffect } from 'react'
import Sidebar_Manager from '../Sidebar/Sidebar_Manager';

export default function Manager_Home() {

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
      <div className="manager-page w-full flex justify-between">

      {/*  side bar */}
              
      <Sidebar_Manager open={open} setOpen={setOpen}/> 

      
      {/*  الصفحة الرئيسية */}
      <div className={`manager-home ${open ? 'mr-90 max-lg:mr-76' : 'mr-20 max-lg:mr-16'}  duration-200 flex-1 justify-items-center`}>

     {/* خانة البحث */}
    <div class="search-bar mt-6  relative">

      <i className="fa-solid fa-magnifying-glass absolute top-5 ps-3 pointer-events-none"/>
      <i className="fa-solid fa-bars absolute top-5 left-6 cursor-pointer"/>
      <input type="text" className=" w-90 h-14 p-2 ps-10 text-sm bg-indigo-100 outline-0 rounded-4xl max-lg:w-70 " placeholder="ابحث"  />  

     </div>

      {/*  محتوى الصفحة الرئيسية  */}
     <div className="manager-home-content w-full grid grid-cols-1  ">

       {/*  التسليمات  */}
      <div style={{color:'var(--primary-color)'}} className="deliverables flex  justify-evenly gap-y-10 flex-wrap text-center mt-16 text-xl duration-300">
          {/*  التسليمات المعلقة  */}
        <div style={{borderColor:'var(--secondary-color)',backgroundColor:'CCCCCC'}} className='w-70 h-74 grid grid-cols-1   justify-items-center border rounded-2xl max-sm:w-64 max-sm:h-66'>
          <h1 className='mt-4'>التسليمات المعلقة</h1>
          <div className='border-8 border-b-orange-950 text-center mt-2 rounded-full w-28 h-28'>
            <h2 className='mt-8'>64%</h2>
          </div>
          <button style={{backgroundColor:'var(--primary-color)'}} className='text-white text-base w-36 h-12 rounded-lg cursor-pointer transition-opacity hover:opacity-80'>مراجعة التسليمات</button>
        </div>
        {/* المتطلبات التي تم تسليمها*/}
        <div style={{borderColor:'var(--secondary-color)',backgroundColor:'CCCCCC'}} className='w-70 h-74 grid grid-cols-1   justify-items-center border rounded-2xl max-sm:w-64 max-sm:h-66'>
          <h1 className='mt-4'>المتطلبات التي تم تسليمها </h1>
          <div className='border-8 border-b-orange-950 text-center mt-2 rounded-full w-28 h-28'>
            <h2 className='mt-8'>80%</h2>
          </div>
          <button style={{backgroundColor:'var(--primary-color)'}} className='text-white text-base w-36 h-12 rounded-lg cursor-pointer transition-opacity hover:opacity-80'>مراجعة التسليمات</button>
        </div>
        {/*  التسليمات المرفوضة  */}
        <div style={{borderColor:'var(--secondary-color)',backgroundColor:'CCCCCC'}} className='w-70 h-74 grid grid-cols-1   justify-items-center border rounded-2xl max-sm:w-64 max-sm:h-66'>
          <h1 className='mt-4'>التسليمات المرفوضة </h1>
          <div className='border-8 border-b-orange-950 text-center  rounded-full w-28 h-28'>
            <h2 className='mt-8'>30%</h2>
          </div>
          <button style={{backgroundColor:'var(--primary-color)'}} className='text-white text-base w-36 h-12 rounded-lg cursor-pointer transition-opacity hover:opacity-80'>مراجعة التسليمات</button>
        </div>

      </div>
       
      <div className="title relative mt-20">
      <h1 style={{color:'var(--secondary-color)'}} className='text-3xl text-center block '>الكليات</h1>
      </div>

      {/*   الكليات  */}
      <div className="colleges title   text-white text-center mt-20 relative text-2xl duration-300 ">
        
        <div style={{backgroundColor:'#611013'}} className=' w-46 h-46 relative rounded-2xl cursor-pointer hover:scale-105 duration-300'>
          <h2 className='centerd'>كلية الطب</h2>
        </div>
        <div style={{backgroundColor:'#611013'}} className=' w-46 h-46 relative rounded-2xl cursor-pointer hover:scale-105 duration-300'>
          <h2 className='centerd'> كلية تكنولوجيا المعلومات</h2>
        </div>
        <div style={{backgroundColor:'#611013'}} className=' w-46 h-46 relative rounded-2xl cursor-pointer hover:scale-105 duration-300'>
          <h2 className='centerd'>كلية الهندسة</h2>
        </div>
        <div style={{backgroundColor:'#611013'}} className=' w-46 h-46 relative rounded-2xl cursor-pointer hover:scale-105 duration-300'>
          <h2 className='centerd'>كلية الاعمال</h2>
        </div>
        <div style={{backgroundColor:'#611013'}} className=' w-46 h-46 relative rounded-2xl cursor-pointer hover:scale-105 duration-300'>
          <h2 className='centerd'>كلية الاداب</h2>
        </div>
        <div style={{backgroundColor:'#611013'}} className=' w-46 h-46 relative rounded-2xl cursor-pointer hover:scale-105 duration-300'>
          <h2 className='centerd'>كلية الشريعة</h2>
        </div>
        <div style={{backgroundColor:'#611013'}} className=' w-46 h-46 relative rounded-2xl cursor-pointer hover:scale-105 duration-300'>
          <h2 className='centerd'>كلية العلوم</h2>
        </div>
        <div style={{backgroundColor:'#611013'}} className=' w-46 h-46 relative rounded-2xl cursor-pointer hover:scale-105 duration-300'>
          <h2 className='centerd'>كلية الصيدلة</h2>
        </div>
        <div style={{backgroundColor:'#611013'}} className=' w-46 h-46 relative rounded-2xl cursor-pointer hover:scale-105 duration-300'>
          <h2 className='centerd'>كلية الرياضة</h2>
        </div>
        <div style={{backgroundColor:'#611013'}} className=' w-46 h-46 relative rounded-2xl cursor-pointer hover:scale-105 duration-300'>
          <h2 className='centerd'>كلية العلوم التربوية</h2>
        </div>
        <div style={{backgroundColor:'#611013'}} className=' w-46 h-46 relative rounded-2xl cursor-pointer hover:scale-105 duration-300'>
          <h2 className='centerd'>كلية التمريض </h2>
        </div>
        <div style={{backgroundColor:'#611013'}} className=' w-46 h-46 relative rounded-2xl cursor-pointer hover:scale-105 duration-300'>
          <h2 className='centerd'>كلية طب الاسنان </h2>
        </div>

      </div>
      

      </div>


      </div>
      </div>

      </section>
    </>
  )
}
