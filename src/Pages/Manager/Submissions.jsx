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
      { name: "د . غيث المحادين", title: "تسليم كتاب", date: "2025/4/2", time: "10:33" },
      { name: "د . حمزة عيال سلمان", title: "تسليم كتاب", date: "2025/4/12", time: "10:03" },
      { name: "د . اسراء الكفاوين", title: "تسليم كتاب", date: "2025/4/15", time: "14:13" },
    ]
  },
  {
    collegeName: " الهندسة",
    doctors: [
      { name: "د . باسم الشرع", title: "تسليم كتاب", date: "2025/4/17", time: "08:55" },
    ]
  },
  {
    collegeName: " طب الاسنان",
    doctors: [
      { name: "د . امل البطوش", title: "تسليم كتاب", date: "2025/4/22", time: "09:13" },
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
      { name: "د . امل البطوش", title: "تسليم كتاب 2025666", date: "2025/4/22" },
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
  const [expandedColleges, setExpandedColleges] = useState([" تكنولوجيا المعلومات"]);
  const [collegesWithTimestamps, setCollegesWithTimestamps] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // إضافة timestamp لكل تسليم وترتيبها
  useEffect(() => {
    const processedColleges = collegesData.map(college => {
      const doctorsWithTimestamp = college.doctors.map(doctor => ({
        ...doctor,
        timestamp: new Date(`${doctor.date.split('/').reverse().join('-')}T${doctor.time}:00`).getTime()
      }));
      
      return {
        ...college,
        doctors: doctorsWithTimestamp.sort((a, b) => b.timestamp - a.timestamp)
      };
    });
    
    setCollegesWithTimestamps(processedColleges);
  }, []);

  // دالة لتبديل فتح/إغلاق الكليات
  const toggleCollege = (collegeName) => {
    if (expandedColleges.includes(collegeName)) {
      setExpandedColleges(expandedColleges.filter(name => name !== collegeName));
    } else {
      setExpandedColleges([...expandedColleges, collegeName]);
    }
  };

  // تحسينات الحركة والانتقالات
  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "backOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section>
      <div className="employee-page w-full flex justify-between">
        <Sidebar_Manager open={open} setOpen={setOpen} />

        <div className={`employee-submissions ${open ? "mr-90 max-lg:mr-76" : "mr-20 max-lg:mr-16"} duration-200 flex-1 justify-items-center`}>
          
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

            <div className='flex flex-row-reverse ml-15 max-xl:ml-5 max-lg:ml-5 max-md:mb-10'>
              <Select styles={customStyles} options={options} isSearchable={false} placeholder=" ترتيب حسب" />
            </div>

            <div className="mt-5">
              {collegesWithTimestamps.map((college, index) => (
                <div key={index} className="mb-5">

                  {/* زر الكلية مع علامة الأحدث */}
                  <div className="relative">
                    <div
                      className={`flex justify-between ${college.collegeName === " تكنولوجيا المعلومات" ? "w-70" : "w-50"} h-12 py-2 px-4 mt-5 mr-5 bg-[#540C0F] rounded-3xl cursor-pointer hover:bg-[#3a090b] transition-colors duration-200`}
                      onClick={() => toggleCollege(college.collegeName)}
                    >
                      <h2 className='text-xl font-bold px-1 text-white'>{college.collegeName}</h2>
                      <motion.i
                        className="fa-solid fa-chevron-right text-white text-sm mt-3 mr-3"
                        animate={{ rotate: expandedColleges.includes(college.collegeName) ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedColleges.includes(college.collegeName) && (
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden"
                      >
                        {college.doctors.map((doctor, idx) => (
                          <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="flex mt-5 relative max-md:grid max-md:justify-items-center"
                          >
                            {/* ايقونة الدكتور */}
                            <div className="icon-submissions w-30 h-30 px-1 flex flex-col items-center justify-center gap-y-2 bg-gray-100 rounded-full border border-[#540C0F] z-10 hover:bg-gray-200 transition-colors duration-200">
                              <i className="fa-solid fa-user text-4xl" />
                              <h2 className="text-center text-sm">{doctor.name}</h2>
                            </div>

                            {/* بيانات التسليم */}
                            <div className="w-150 h-15 bg-gray-100 flex gap-x-3 justify-center mt-5 mr-5 text-[#540C0F] border border-[#540C0F] rounded-xl relative cursor-pointer overflow-hidden hover:bg-gray-200 transition-colors duration-200 max-xl:gap-x-2 max-md:w-60 max-md:h-60 max-md:flex-col max-md:justify-around max-md:gap-y-5 max-md:ml-5">
                              {idx === 0 && (
                                <div className="absolute animate-pulse -top-1 right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                                  الأحدث
                                </div>
                              )}
                              <h2 className="w-1/3 mt-4 max-xl:mt-2 mr-6 pl-2 truncate max-md:w-full max-md:mr-0 max-md:mt-4 max-md:text-center" title={doctor.title}>العنوان: {doctor.title}</h2>
                              <h2 className="w-1/3 mt-4 max-xl:mt-2 border-left-sub border-right-sub max-md:w-full max-md:text-center">التاريخ: {doctor.date}</h2>
                              <h2 className="w-1/3 mt-4 max-xl:mt-2 text-center max-md:w-full">الوقت: {doctor.time}</h2>
                            </div>

                            <div className='flex gap-x-4 mr-10 mt-8 max-xl:mr-3 max-xl:ml-3 max-md:ml-0 max-md:mb-10 max-md:gap-x-25'>
                              <motion.div 
                                className='w-8 h-8 bg-green-500 py-1 px-2 rounded-md cursor-pointer hover:bg-green-600 transition-colors duration-200'
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <i className="fa-solid fa-check text-white"></i>
                              </motion.div>
                              <motion.div 
                                className='w-8 h-8 bg-red-500 py-1 px-2.5 rounded-md cursor-pointer hover:bg-red-600 transition-colors duration-200'
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <i className="fa-solid fa-xmark text-white"></i>
                              </motion.div>
                            </div>
                          </motion.div>
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