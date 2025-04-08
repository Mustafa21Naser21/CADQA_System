import React from 'react'
import { useState,useEffect } from 'react';
import Select from "react-select";
import Sidebar_Academic_Staff from '../Sidebar/Sidebar_Academic_Staff';


// select style
const customStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    color: "#8B171C",
    width:'300px',  //  حجم select
    height:'50px',
    padding:'5px',
    border:'2px solid #8B171C',
    borderRadius:'5px',
    boxShadow: "none",
    "&:hover": { borderColor: "#8B171C" },
  }),
  menu: (base) => ({
    ...base,
    width: "300px", //  حجم select عند الاختيار   
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

{/* بيانات اختيار الفئة الرئيسية */}
const optionCollege = [
  { value: "", label: "كلية تكنولوجيا المعلومات" },
  { value: "", label: "كلية الرياضة" },
  { value: "", label: "كلية الهندسة" },

];

export default function Academic_Staff_Submission_Detalis() {

    const [open, setOpen] = useState(window.innerWidth > 640);
    const [fileNames, setFileNames] = useState([]);

      useEffect(() => {
        const handleResize = () => {
          setOpen(window.innerWidth > 640);
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
 

    // دالة لفتح نافذة اختيار الملفات عند النقر على الأيقونة
    const handleIconClick = () => {
      document.querySelector("#fileInput").click();
    };
  
    // دالة لتحديث اسم الملف عند الاختيار
    const handleFileChange = (event) => {
      const files = Array.from(event.target.files); 
      if (files.length > 0) {
        const newFileNames = files.map((file) => file.name); 
        setFileNames((prevFileNames) => [...prevFileNames, ...newFileNames]);
      }
    };
  return (
    <>
    <section>
    <div className="academic-staff-page w-full flex justify-between">

      {/*  side bar */}
      <Sidebar_Academic_Staff open={open} setOpen={setOpen}/> 
       
       {/* صفحة رفع ملف جديد*/}
      <div className={` ${open ? 'mr-90 max-lg:mr-76 ' : 'mr-20 max-lg:mr-25 '}  duration-200 flex-1 justify-items-center mb-10`}>
       
       {/*  محتوى صفحة رفع ملف جديد*/}
      <div className={` ${!open ? 'max-lg:mr-20 max-xl:mr-0' : 'mr-0'} w-full grid grid-cols-1 max-sm:justify-items-start`} >

        <h1 className='text-4xl text-[#540C0F] font-bold text-center mt-6'>رفع ملف جديد</h1>
        
        {/* اختيار المتطلب المراد تسليمه */}
        <div className='flex gap-x-10 mt-20 mb-5 max-xl:gap-x-5 max-xl:flex-wrap max-lg:flex-col'>
          <div className='mr-10 max-lg:mr-2 max-sm:mr-0'>
            <h2 className='text-2xl font-bold text-[#540C0F]'>اختر المتطلب المراد تسليمه</h2>
          </div>

          <div className='max-lg:mt-5'>
          <Select  styles={customStyles} options={optionCollege} isSearchable={false} isDisabled={true} placeholder=" اختر الكلية "  />
          </div>
        </div>

        {/* عنوان الوثيقة */}
        <div className='mr-10 mt-10 max-lg:mr-2 max-sm:mr-0'>
          <h2 className='text-2xl font-bold text-[#540C0F]'>عنوان الوثيقة</h2>
          <input readOnly className='w-75 h-14 text-[#540C0F] bg-gray-200 rounded-lg p-2 mt-4 outline-none border border-gray-400 max-lg:w-60' type="text" />
        </div>

          {/* وصف الوثيقة */}
        <div className='mr-10 mt-10 max-lg:mr-2 max-sm:mr-0'>
          <h2 className='text-2xl font-bold text-[#540C0F]'>وصف الوثيقة</h2>
          <textarea readOnly className='w-150 h-30 text-[#540C0F] bg-gray-200 rounded-lg p-2 mt-4 outline-none border border-gray-400 max-xl:w-120 max-lg:w-100 max-sm:w-70 max-sm:h-40' type="text" />
        </div>
         
         {/* الملفات الملرفقة */}
        <div className='mr-10 mt-10 max-lg:mr-2 max-sm:mr-0'>
          <h2 className='text-2xl font-bold text-[#540C0F]'>الملفات المرفقة</h2>
          
          <i className="fa-solid fa-file text-[#540C0F] text-2xl mt-2"
          />
           
           {/* عرض اسماء الملفات التي تم اختيارها */}
          {fileNames.length > 0 && (
          <ul style={{marginTop:'-25px'}} className="text-[#540C0F] mr-10 ">
            {fileNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        )}
          
          <input  className='hidden' type="file" multiple  id="fileInput" onChange={handleFileChange} placeholder='اختر ملف' />
        </div>

{/* حالة التسليم +  نص ملاحظات الموظف */}
<div className='flex gap-x-80 mr-10 mb-10 mt-15 max-md:flex-col max-xl:gap-x-30 max-lg:gap-x-15 max-lg:gap-y-10 max-lg:items-start max-lg:mr-2 max-sm:mr-0'>

  {/* مربع الملاحظات */}
  <div className=''>
    <h2 className='text-2xl font-bold text-[#540C0F] mb-4'>الملاحظات</h2>
    <textarea
    readOnly
      className='w-100 max-xl:w-70 max-lg:w-60 h-30 text-[#540C0F] bg-gray-200 rounded-lg p-2 outline-none border border-gray-400'
      placeholder='لا يوجد'
      rows="5"
    ></textarea>
  </div>

  {/* حالة التسليم */}
  <div className='w-full max-w-md mt-12 '>
    <h2 className='text-2xl font-bold text-[#540C0F] mb-5'>حالة التسليم</h2>
    <div className='space-y-3'>
      <h2 className='bg-green-500 text-white text-xl w-28 rounded-3xl text-center py-2'>مقبول</h2>
      <h2 className='bg-red-500 text-white text-xl w-28 rounded-3xl text-center py-2 hidden'>مرفوض</h2>
      <h2 className='bg-orange-400 text-white text-xl w-28 rounded-3xl text-center py-2 hidden'>معلق</h2>
    </div>
  </div>

</div>


        {/* زر تسليم الوثيقة */}
        <div className='hidden mr-10 mt-10  justify-items-center translate-x-15 max-xl:translate-x-5 max-lg:mr-4 max-sm:translate-x-0 max-sm:mr-6'>
         <button className='w-50 h-14 bg-[#540C0F] text-white text-2xl rounded-2xl py-2 px-4 cursor-pointer transition-opacity hover:opacity-80'>تسليم الوثيقة</button>
        </div>
        

    </div>
    </div> 
    </div>
    </section>
    </>
  )
}
