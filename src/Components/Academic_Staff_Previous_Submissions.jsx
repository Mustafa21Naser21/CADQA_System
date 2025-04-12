import React from 'react'
import { useState,useEffect } from 'react'
import Sidebar_Academic_Staff from '../Sidebar/Sidebar_Academic_Staff';
import Select from "react-select";
    

const customStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    color: "#8B171C",
    width:'200px',  // حجم select
    height:'50px',
    padding:'5px',
    border:'2px solid #8B171C',
    borderRadius:'5px',
    boxShadow: "none",
    "&:hover": { borderColor: "#8B171C" },
  }),
  menu: (base) => ({
    ...base,
    width: "200px",  // حجم select عند الاختيار 
  }),
  singleValue: (base) => ({
    ...base,
    color: "#8B171C", // لون النص عند اختيار الخيار
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? "#8B171C" : "white",
    color: isFocused ? "white" : "#8B171C",
    cursor: "pointer",
  }),
};

const option=[
    {value: "", label:"فلترة"}
]


export default function Academic_Staff_Previous_Submissions() {

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
        <div className={` ${open ? 'mr-90 max-lg:mr-76' : 'mr-20 max-lg:mr-16'}  duration-200 flex-1 justify-items-center`}>

         {/* خانة البحث */}
        <div className="search-bar mt-6  relative">

        <i className="fa-solid fa-magnifying-glass absolute top-5 ps-3 pointer-events-none"/>
        <i className="fa-solid fa-bars absolute top-5 left-6 cursor-pointer"/>
        <input type="text" className=" w-90 h-14 p-2 ps-10 text-sm bg-indigo-100 outline-0 rounded-4xl max-lg:w-70 " placeholder="ابحث"  />  

        </div>
  
      
         {/*  محتوى الصفحة الرئيسية  */}
        <div className="academic-staff-content mb-10  w-full grid grid-cols-1  ">

        <h1  className=' text-center text-[#540C0F] my-15 relative text-4xl font-bold max-sm:mb-16 '>التسليمات السابقة</h1> 
        {/*فلترة */}
        <div className='flex flex-row-reverse ml-15'>
        <Select  styles={customStyles} options={option} isSearchable={false} placeholder=" "  />
        </div>
         
         {/*التسليمات السابقة */}
        <div className='mr-15'>
         <div className='flex cursor-pointer'>
            <h2 className='text-3xl font-bold text-[#540C0F]'>٢٠٢٤</h2>
            <i className="fa-solid fa-chevron-right text-[#540C0F] text-sm mt-3 mr-3"></i>
         </div>
         <div className='flex justify-between w-40 h-12 py-2 px-3 mt-5 mr-5 bg-[#540C0F] rounded-3xl cursor-pointer'>
            <h2 className='text-2xl font-bold text-white'>٢٠٢٤-حزيران</h2>
            <i className="fa-solid fa-chevron-right text-white text-sm mt-3"></i>
         </div>
         <div className='submissions'>
            <div className='submission-accepted w-135 h-20 bg-gray-100 flex gap-x-6 justify-center mt-5 mr-5  text-[#540C0F] border border-black rounded-xl relative'>
               <h2 className='mt-6 vvv'>العنوان: تسليم كتاب ترقية</h2> 
               <h2 className='mt-6 vv'>تاريخ التسليم: ١٥-٦-٢٠٢٥</h2>
               <h2 className='mt-6'>حالة التسليم: <span className=' px-2 py-0.5 bg-green-500 text-white text-sm rounded-3xl'>مقبول</span> </h2>
            </div>
            <div className='submission-pending w-135 h-20 bg-gray-100 flex gap-x-5 justify-center mt-5 mr-5  text-[#540C0F] border border-black rounded-xl relative'>
            <h2 className='mt-6 vvv'>العنوان: تسليم كتاب ترقية</h2> 
               <h2 className='mt-6 vv'>تاريخ التسليم: ١٥-٦-٢٠٢٥</h2>
               <h2 className='mt-6'>حالة التسليم: <span className=' px-2 py-0.5 bg-orange-500 text-white text-sm rounded-3xl'>معلق</span> </h2>
            </div>
            <div className='submission-rejected w-135 h-20 bg-gray-100 flex gap-x-5 justify-center mt-5 mr-5  text-[#540C0F] border border-black rounded-xl relative'>
            <h2 className='mt-6 vvv'>العنوان: تسليم كتاب ترقية</h2> 
               <h2 className='mt-6 vv'>تاريخ التسليم: ١٥-٦-٢٠٢٥</h2>
               <h2 className='mt-6'>حالة التسليم: <span className=' px-2 py-0.5 bg-red-500 text-white text-sm rounded-3xl'>مرفوض</span> </h2>
            </div>
         </div>
         <div className='flex justify-between w-40 h-12 py-2 px-3 mt-5 mr-5 bg-[#540C0F] rounded-3xl cursor-pointer'>
            <h2 className='text-2xl font-bold text-white'>٢٠٢٤-ايار</h2>
            <i className="fa-solid fa-chevron-right text-white text-sm mt-3"></i>
         </div>
         <div className=' submission-nothing mt-5 mr-5 '>
            <h2 className='text-xl text-gray-400 font-bold'>لا يوجد تسليمات</h2>
         </div>
        </div>



        </div>
        </div>
        </div>
    </section>
    </>
  )
}
