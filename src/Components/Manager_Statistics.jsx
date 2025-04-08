import React from 'react'
import { useState,useEffect } from 'react';
import Sidebar_Manager from '../Sidebar/Sidebar_Manager'
import { Bar } from "react-chartjs-2";
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

{/* بيانات اختيار الكلية */}
const optionCollege = [
  { value: "", label: "كلية تكنولوجيا المعلومات" },
  { value: "", label: "كلية الرياضة" },
  { value: "", label: "كلية الهندسة" },
  { value: "", label: "كلية الطب" },
  { value: "", label: "كلية الاعمال" },
  { value: "", label: "كلية الاداب" },
  { value: "", label: "كلية العلوم" },
  { value: "", label: "كلية طب الاسنان" },
  { value: "", label: "كلية الصيدلة" },
  { value: "", label: "كلية التمريض" },
  { value: "", label: "كلية الحقوق" },
  { value: "", label: "كلية العلوم التربوية" },
  { value: "", label: "كلية العلوم الاجتماعية" },
  { value: "", label: "كلية اللغات" },
];

{/* بيانات اختيار القسم */}
const optionDepartment = [
  { value: "", label: "هندسة البرمجيات" },
  { value: "", label: "الذكاء الاصطناعي و علوم البيانات" },
  { value: "", label: " علوم الحاسوب" },
  { value: "", label: " امن المعلومات" },
  { value: "", label: " نظم المعلومات" },

];


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
      <div className={` ${open ? 'mr-90 max-lg:mr-76' : 'mr-20 max-lg:mr-16  '}  duration-200 flex-1 justify-items-center`}>
       
       {/*  محتوى صفحة الاحصائيات*/}
      <div className=" w-full grid grid-cols-1  ">

       <h1  className='text-4xl text-[#540C0F] text-center font-bold mt-6'>تقارير و احصائيات</h1>
        
        {/* بيانات الاحصائيات */}
       <div className='mt-20 grid grid-cols-1 justify-items-center'>
         
          {/*  اختيار الكلية و القسم */}
        <div className=' flex justify-evenly w-full gap-x-5 px-4 max-sm:flex-col max-sm:gap-y-5 max-sm: '>
        <Select  styles={customStyles} options={optionCollege} isSearchable={false} placeholder="إختر الكلية"  />
        <Select  styles={customStyles} options={optionDepartment} isSearchable={false} placeholder="إختر القسم"  />
        </div>
         
          {/*  المخطط البياني */}
        <div className='statistics mt-6 w-full flex justify-center '>

        <Bar  data={data} options={options}/>

        </div>
         
          {/*  تصدير تقارير الاحصائيات button */}
        <div className='mt-10 mb-10'>
          <button  className='w-64 h-14 bg-[#540C0F] text-white text-xl rounded-3xl py-2 px-4 cursor-pointer transition-opacity hover:opacity-80'>تصدير تقرير الاحصائيات</button>
        </div>

        </div>
        </div>
        </div> 
        </div>
        </section>
    </>
  )
}
