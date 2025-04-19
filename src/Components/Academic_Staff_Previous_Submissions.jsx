// Academic_Staff_Previous_Submissions.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar_Academic_Staff from '../Sidebar/Sidebar_Academic_Staff';
import Select from 'react-select';
import { motion, AnimatePresence } from 'framer-motion';

// الأنماط المخصصة للقائمة المنسدلة
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
    cursor:'pointer',
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

const option = [{ value: '', label: 'فلترة' }];

// أسماء الأشهر بالعربية
const monthsMap = {
  '01': ' يناير', '02': 'فبراير', '03': 'مارس', '04': 'ابريل',
  '05': 'مايو', '06': 'يونيو', '07': 'يوليو', '08': 'اغسطس',
  '09': 'سبتمبر', '10': 'اكتوبر', '11': ' نوفمبر', '12': ' ديسمبر'
};

// بيانات وهمية للتجربة
const dummyData = [
  { title: 'تسليم كتاب ترقية', date: '2025-04-15', status: 'مقبول' },
  { title: 'تسليم بحث علمي', date: '2025-04-10', status: 'معلق' },
  { title: ' تسليم كتاب ترقية', date: '2025-03-22', status: 'مرفوض' },
  { title: 'تقرير تدريسي', date: '2025-03-20', status: 'مقبول' },
  { title: ' تسليم شهادة دورات', date: '2025-02-17', status: 'مرفوض' },
  { title: ' تسليم كتاب ترقية', date: '2025-02-19', status: 'مقبول' },
  { title: ' تسليم شهادة دورات', date: '2025-01-22', status: 'مقبول' },
  { title: 'تقرير تدريسي', date: '2024-11-22', status: 'مرفوض' },
  { title: 'تقرير تدريسي', date: '2024-12-15', status: 'مرفوض' },

];

export default function Academic_Staff_Previous_Submissions() {
  const [open, setOpen] = useState(window.innerWidth >= 1024);
  const [expandedYears, setExpandedYears] = useState({});
  const [expandedMonths, setExpandedMonths] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    const handleResize = () => setOpen(window.innerWidth > 1024); // sidebar مغلق على الشاشات المتوسطة
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // فتح أحدث سنة وشهر عند تحميل الصفحة
  useEffect(() => {
    if (dummyData.length === 0) return;
    const sorted = [...dummyData].sort((a, b) => new Date(b.date) - new Date(a.date));
    const [latestYear, latestMonth] = sorted[0].date.split('-');
    setExpandedYears({ [latestYear]: true });
    setExpandedMonths({ [`${latestYear}-${latestMonth}`]: true });
  }, []);

  // تنظيم البيانات حسب السنة والشهر
  const groupedData = {};
  dummyData.forEach(({ date, ...rest }) => {
    const [year, month] = date.split('-');
    if (!groupedData[year]) groupedData[year] = {};
    if (!groupedData[year][month]) groupedData[year][month] = [];
    groupedData[year][month].push({ date, ...rest });
  });

  const toggleYear = (year) => {
    setExpandedYears((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  const toggleMonth = (year, month) => {
    const key = `${year}-${month}`;
    setExpandedMonths((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (

    <section>

    <div className="academic-staff-page w-full flex justify-between">

   <Sidebar_Academic_Staff open={open} setOpen={setOpen} />

     <div className={`academic-staff-previous-submissions ${open ? 'mr-90 max-lg:mr-76' : 'mr-20 max-lg:mr-16'} duration-200 flex-1`}>

     <div className=" mb-10 w-full grid grid-cols-1">

     <h1 className='text-center text-[#540C0F] mt-10 mb-15 relative text-4xl font-bold max-sm:mb-16'>التسليمات السابقة</h1>

     {/* فلترة */}

     <div className='flex flex-row-reverse ml-15 max-lg:ml-5 max-md:mb-10 '>
       <Select styles={customStyles} options={option} isSearchable={false} placeholder="فلترة " />
     </div>

     {/* عرض السنوات */}
     <div className='mr-15 max-xl:mr-5'>
     {Object.keys(groupedData).sort((a, b) => b - a).map((year) => (
       <div key={year}>

         {/* زر السنة */}
         <div onClick={() => toggleYear(year)} className='flex cursor-pointer items-center mt-6'>
           <h2 className='text-3xl font-bold text-[#540C0F] max-lg:mr-4'>{year}</h2>
           <i className={`fa-solid fa-chevron-right text-[#540C0F] text-sm mt-3 mr-3 transition-transform duration-300 ${expandedYears[year] ? 'rotate-90' : ''}`}></i>
         </div>

         {/* محتوى السنة */}
         <AnimatePresence initial={false}>
           {expandedYears[year] && (
             <motion.div
               key="year-content"
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: 'auto', opacity: 1 }}
               exit={{ height: 0, opacity: 0 }}
               transition={{ duration: 0.3 }}
               className="overflow-hidden"
             >
               {Object.keys(groupedData[year]).sort((a, b) => b - a).map((month) => {
                 const key = `${year}-${month}`;
                 return (
                <div key={month}>
                  {/* زر الشهر */}
                  <div
                    onClick={() => toggleMonth(year, month)}
                    className='flex justify-between w-40  h-12 p-2 mt-5 mr-5 bg-[#540C0F] rounded-3xl cursor-pointer'
                  >
                    <h2 className='text-2xl font-bold px-1 text-white'>{monthsMap[month]}</h2>
                    <i className={`fa-solid fa-chevron-right text-white text-sm mt-3 mr-3 transition-transform duration-300 ${expandedMonths[key] ? 'rotate-90' : ''}`}></i>
                  </div>
                  
                  {/* تسليمات الشهر */}
                  <AnimatePresence initial={false}>
                    {expandedMonths[key] && (
                      <motion.div
                        key="month-content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        {groupedData[year][month].map((submission, index) => (
                          <div
                            key={index}  onClick={() => navigate('/Academic_Staff_Submission_Detalis', { state: submission })}
                            className='w-135 h-20 bg-gray-100 flex px-2 justify-center mt-5 mr-5 text-[#540C0F] border border-black rounded-xl relative cursor-pointer max-md:w-60 max-md:h-60 max-md:flex-col max-md:px-8 max-md:gap-y-5'
                          >
                            <h2 className='w-1/3 text-center mt-6 truncate' title={submission.title}>العنوان: {submission.title}</h2>
                            <h2 className='w-2/5 text-center mt-6 border-right border-left'>تاريخ التسليم: {submission.date}</h2>
                            <h2 className='w-1/3 text-center mt-6'>
                              حالة التسليم:
                              <span className={`px-2 py-0.5 text-white text-sm rounded-3xl mr-2 ${
                                submission.status === 'مقبول' ? 'bg-green-500' :
                                submission.status === 'معلق' ? 'bg-orange-500' :
                                submission.status === 'مرفوض' ? 'bg-red-500' : ''
                              }`}>
                                {submission.status}
                              </span>
                            </h2>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
             })}
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