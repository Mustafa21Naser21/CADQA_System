import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar_Employee from '../../Components/Sidebar/Employee';

export default function Categorey_Management() {

    const [open, setOpen] = useState(window.innerWidth > 640);

    useEffect(() => {
      const handleResize = () => {
        setOpen(window.innerWidth > 640);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  return (
    <>
       <section>     
        <div className="employee-page w-full flex justify-between">

          {/*  الشريط الجانبي */}
          <Sidebar_Employee open={open} setOpen={setOpen} />

          {/*  الصفحة الرئيسية */}
          <div className={`employee-category-management ${open ? "mr-90 max-lg:mr-76" : "mr-20 max-lg:mr-16"} duration-200 flex-1 justify-items-center`}>

            {/* خانة البحث */}
            <div className="search-bar mt-6 relative">
              <i className="fa-solid fa-magnifying-glass absolute top-5 ps-3 pointer-events-none" />
              <i className="fa-solid fa-bars absolute top-5 left-6 cursor-pointer" />
              <input type="text" className="w-90 h-14 p-2 ps-10 text-sm bg-indigo-100 outline-0 rounded-4xl max-lg:w-70" placeholder="ابحث" />
            </div>

            {/*  محتوى الصفحة الرئيسية */}
            <div className=" w-full grid grid-cols-1">

              {/*  عنوان الكليات */}
              <div className="title relative mt-20">
                <h1  className="text-4xl font-bold text-[#540C0F] text-center block">
                إدارة الملفات
                </h1>
              </div>

              {/*  قائمة الكليات */}
              <div className="colleges title text-white text-center mt-20 text-2xl duration-300">
                {[
                  "كلية الطب", "كلية تكنولوجيا المعلومات", "كلية الهندسة",
                   "كلية الاعمال","كلية الاداب","كلية الشريعة",
                    "كلية العلوم","كلية الصيدلة","كلية الرياضة","كلية العلوم التربوية",
                    "كلية التمريض","كلية طب الاسنان","الحوكمة","التخطيط الاستراتيجي"].map((college, index) => (
                   <Link to={'/Employee_Faculty_Files'}>
                  <div key={index}  className="w-46 h-46 bg-[#611013] relative rounded-2xl cursor-pointer hover:scale-105 duration-300">
                    <h2 className="centerd">{college}</h2>
                  </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
    </section>
    </>
  )
}
