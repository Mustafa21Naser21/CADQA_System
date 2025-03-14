import React from 'react'
import { useState,useEffect } from 'react';
import Sidebar_Manager from '../Sidebar/Sidebar_Manager'
import { Bar } from "react-chartjs-2";


export default function Manager_Statistics() {

    const [open, setOpen] = useState(window.innerWidth > 1024);

      useEffect(() => {
        const handleResize = () => {
          setOpen(window.innerWidth >1024);
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const data = {
      labels: [
        "كلية الطب","كلية الهندسة", "كلية تكنولوجيا المعلومات",
        "كلية الشريعة", "كلية الحقوق", "كلية الرياضة",
        "كلية طب الاسنان", "كلية الاداب","كلية الاعمال",
        "كلية العلوم","كلية الصيدلة","كلية العلوم التربوية",
      ],
      datasets: [
        {
          label:"التسليمات",
          data: [10, 15, 20, 60, 65, 18, 22, 63,33,82,44,12,70], // بيانات كل كلية
          backgroundColor: "#540C0F", // لون الاعمدة 
          maxBarThickness: 30,// حجم الأعمدة
        }
      ]
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "تسليمات كل كلية",
          font:{
            size:30
          },
          color:"#540C0F"
        },
      },
    };

  return (
    <>
    <section>
    <div className="manager-page w-full flex justify-between">

      {/*  side bar */}
      <Sidebar_Manager open={open} setOpen={setOpen}/> 
       
       {/* صفحة الاحصائيات*/}
      <div className={` ${open ? 'mr-90 max-lg:mr-76' : 'mr-20 max-lg:mr-16'}  duration-200 flex-1 justify-items-center`}>
       
       {/*  محتوى صفحة الاحصائيات*/}
      <div className=" w-full grid grid-cols-1  ">
       <h1 style={{color:'var(--secondary-color)'}} className='text-4xl text-center font-bold mt-6'>تقارير و احصائيات</h1>
        
        {/* بيانات الاحصائيات */}
       <div className='px-10 mt-20 grid grid-cols-1 justify-items-center'>
         
          {/*  اختيار الكلية و القسم */}
        <div className=' flex justify-around w-full '>
        <select className=" w-60 border-2 border-[#8B171C]  text-[#8B171C] bg-white rounded-md px-3 py-2 focus:outline-none " name="" id=""
         onFocus={(e) => e.target[0].remove()}>
            <option value="">إختر الكلية</option>
            <option value="">كلية تكنولوجيا المعلومات</option>
            <option value="">كلية الرياضة</option>
            <option value="">كلية الهندسة</option>
            <option value="">كلية الطب</option>
         </select>
         <select className=" w-60 border-2 border-[#8B171C] text-[#8B171C] bg-white rounded-md px-3 py-2 focus:outline-none" name="" id=""
         onFocus={(e) => e.target[0].remove()}>
            <option value="">إختر القسم</option>
            <option value="">هندسة البرمجيات</option>
            <option value="">علوم البيانات و الذكاء الاصطناعي</option>
            <option value="">علوم الحاسوب</option>
            <option value="">امن المعلومات</option>
         </select>
        </div>
         
          {/*  المخطط البياني */}
        <div className='statistics mt-6 w-full flex justify-center'>

        <Bar  data={data} options={options}/>

        </div>
         
          {/*  تصدير تقارير الاحصائيات button */}
        <div className='mt-10 mb-10'>
          <button style={{backgroundColor:'var(--secondary-color)'}} className='w-64 h-14 text-white text-xl rounded-3xl py-2 px-4 cursor-pointer transition-opacity hover:opacity-80'>تصدير تقرير الاحصائيات</button>
        </div>

    </div>
      </div>
       </div> 
        </div>
         </section>
    </>
  )
}
