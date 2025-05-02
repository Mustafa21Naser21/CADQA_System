import React, { useState, useEffect } from 'react';
import Select from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar_Manager from '../../Components/Sidebar/Manager';

// ستايلات خاصة لعنصر Select
const customStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    color: '#8B171C',
    width: '200px',
    height: '50px',
    padding: '5px',
    border: '2px solid #8B171C',
    borderRadius: '5px',
    boxShadow: 'none',
    cursor: 'pointer',
    '&:hover': { borderColor: '#8B171C' },
  }),
  menu: (base) => ({ ...base, width: '200px' }),
  singleValue: (base) => ({ ...base, color: '#8B171C' }),
  option: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? '#8B171C' : 'white',
    color: isFocused ? 'white' : '#8B171C',
    cursor: 'pointer',
  }),
};

// خيارات فلترة التسليمات
const options = [
  { value: "", label: " حسب وقت التسليم" },
  { value: "", label: " حسب الكليات" },
];

// بيانات الكليات والدكاترة
const collegesData = [
  {
    collegeName: " تكنولوجيا المعلومات",
    doctors: [
      { name: "د . غيث المحادين", title: "تسليم كتاب", date: "2025/4/2" },
      { name: "د . حمزة عيال سلمان", title: "تسليم كتاب", date: "2025/4/12" },
      { name: "د . اسراء الكفاوين", title: "تسليم كتاب", date: "2025/4/15" },
    ]
  },
  {
    collegeName: " الهندسة",
    doctors: [
      { name: "د . باسم الشرع", title: "تسليم كتاب", date: "2025/4/17" },
    ]
  },
  {
    collegeName: " طب الاسنان",
    doctors: [
      { name: "د . امل البطوش", title: "تسليم كتاب", date: "2025/4/22" },
    ]
  },
  {
    collegeName: " الاعمال",
    doctors: [
      { name: "د . احمد ابو زيد", title: "تسليم كتاب", date: "2025/4/10" },
    ]
  },
  {
    collegeName: " العلوم ",
    doctors: [
      { name: "د . امل البطوش", title: "تسليم كتاب", date: "2025/4/22" },
    ]
  },
  {
    collegeName: " الطب ",
    doctors: [
      { name: "د . امل البطوش", title: "تسليم كتاب", date: "2025/4/22" },
    ]
  },
  {
    collegeName: " الصيدلة ",
    doctors: [
      { name: "د . امل البطوش", title: "تسليم كتاب", date: "2025/4/22" },
    ]
  },
  {
    collegeName: " التمريض ",
    doctors: [
      { name: "د . امل البطوش", title: "تسليم كتاب", date: "2025/4/22" },
    ]
  },
  {
    collegeName: "الاداب ",
    doctors: [
      { name: "د . امل البطوش", title: "تسليم كتاب", date: "2025/4/22" },
    ]
  },
  {
    collegeName: "الحقوق ",
    doctors: [
      { name: "د . امل البطوش", title: "تسليم كتاب", date: "2025/4/22" },
    ]
  },
  {
    collegeName: " الشريعة ",
    doctors: [
      { name: "د . امل البطوش", title: "تسليم كتاب", date: "2025/4/22" },
    ]
  },
  {
    collegeName: "الرياضة ",
    doctors: [
      { name: "د . امل البطوش", title: "تسليم كتاب", date: "2025/4/22" },
    ]
  },
  {
    collegeName: " العلوم التربوية ",
    doctors: [
      { name: "د . امل البطوش", title: "تسليم كتاب", date: "2025/4/22" },
    ]
  },
];

export default function Submissions() {
  
  const [open, setOpen] = useState(window.innerWidth > 1024);  
  const [expandedColleges, setExpandedColleges] = useState([" تكنولوجيا المعلومات"]); // الكليات المفتوحة (مفتوح افتراضيا تكنولوجيا المعلومات)

  useEffect(() => {
    
    const handleResize = () => {
      setOpen(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // دالة لتبديل فتح/إغلاق الكليات
  const toggleCollege = (collegeName) => {
    if (expandedColleges.includes(collegeName)) {
      setExpandedColleges(expandedColleges.filter(name => name !== collegeName));
    } else {
      setExpandedColleges([...expandedColleges, collegeName]);
    }
  };

  return (
    <section>
      <div className="employee-page w-full flex justify-between">
        
        {/* الشريط الجانبي */}
        <Sidebar_Manager open={open} setOpen={setOpen} />

        <div className={`employee-submissions ${open ? "mr-90 max-lg:mr-76" : "mr-20 max-lg:mr-16"} duration-200 flex-1 justify-items-center`}>
          
          {/* شريط البحث */}
          <div className="search-bar mt-6 relative">
            <i className="fa-solid fa-magnifying-glass absolute top-5 ps-3 pointer-events-none" />
            <i className="fa-solid fa-bars absolute top-5 left-6 cursor-pointer" />
            <input 
              type="text" 
              className="w-90 h-14 p-2 ps-10 text-sm bg-indigo-100 outline-0 rounded-4xl max-lg:w-70" 
              placeholder="ابحث" 
            />
          </div>

          <div className="w-full grid grid-cols-1">
            <h1 className='text-4xl text-[#540C0F] font-bold text-center mt-10 mb-5'>التسليمات</h1>

            {/* فلترة التسليمات */}
            <div className='flex flex-row-reverse ml-15 max-xl:ml-5 max-lg:ml-5 max-md:mb-10'>
              <Select styles={customStyles} options={options} isSearchable={false} placeholder=" ترتيب حسب" />
            </div>

            {/* عرض الكليات والدكاترة */}
            <div className="mt-5">
              {collegesData.map((college, index) => (
                <div key={index} className="mb-5">

                  {/* زر الكلية */}
                  <div
                    className={`flex justify-between ${college.collegeName === " تكنولوجيا المعلومات" ? "w-70" : "w-50"} h-12 py-2 px-4 mt-5 mr-5 bg-[#540C0F] rounded-3xl cursor-pointer`}
                    onClick={() => toggleCollege(college.collegeName)}
                  >
                    <h2 className='text-xl font-bold px-1 text-white'>{college.collegeName}</h2>
                    <motion.i
                      className="fa-solid fa-chevron-right text-white text-sm mt-3 mr-3"
                      animate={{ rotate: expandedColleges.includes(college.collegeName) ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* عرض دكاترة الكلية بالتوسيع */}
                  <AnimatePresence>
                    {expandedColleges.includes(college.collegeName) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="overflow-hidden mt-4"
                      >
                        {college.doctors
                          .slice()
                          .sort((a, b) => new Date(b.date) - new Date(a.date)) // ترتيب حسب تاريخ التسليم تنازلياً
                          .map((doctor, idx) => (
                            <div key={idx} className="flex mt-5 relative max-md:grid max-md:justify-items-center">
                              
                              {/* ايقونة الدكتور */}
                              <div className="icon-submissions w-30 h-30 px-1 flex flex-col items-center justify-center gap-y-2 bg-gray-100 rounded-full border border-[#540C0F] z-10">
                                <i className="fa-solid fa-user text-4xl" />
                                <h2 className="text-center text-sm">{doctor.name}</h2>
                              </div>

                              {/* بيانات التسليم */}
                              <div className="w-150 h-15 bg-gray-100 flex  gap-x-3 justify-center mt-5 mr-5 text-[#540C0F] border border-[#540C0F] rounded-xl relative cursor-pointer overflow-hidden max-xl:gap-x-2 max-md:w-60 max-md:h-60 max-md:flex-col max-md:justify-around max-md:gap-y-5 max-md:ml-5">
                                <h2 className="w-1/3 mt-4 max-xl:mt-2 mr-6 text-center max-md:w-full max-md:mr-0 max-md:mt-4">العنوان: {doctor.title}</h2>
                                <h2 className="w-1/3 mt-4 max-xl:mt-2 text-center border-left-sub border-right-sub max-md:w-full">تاريخ التسليم: {doctor.date}</h2>
                                <h2 className="w-2/5 mt-4 max-xl:mt-2 text-center max-md:w-full">الكلية: {college.collegeName}</h2>
                              </div>

                              <div className='flex gap-x-4 mr-10 mt-8 max-xl:mr-3 max-xl:ml-3 max-md:ml-0 max-md:mb-10 max-md:gap-x-25'>
                                <div className='w-8 h-8 bg-green-500 py-1 px-2 rounded-md cursor-pointer'>
                                <i class="fa-solid fa-check text-white"></i>
                                </div>
                                <div className='w-8 h-8 bg-red-500 py-1 px-2 rounded-md cursor-pointer'>
                                <i class="fa-solid fa-xmark text-white"></i>
                                </div>
                              </div>
                            </div>


                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
