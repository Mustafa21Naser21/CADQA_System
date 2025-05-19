import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar_Manager from '../../Components/Sidebar/Manager';
import { motion, AnimatePresence } from 'framer-motion';

export default function Timeline_Record() {
  const [open, setOpen] = useState(window.innerWidth > 1024);
  const [expandedYears, setExpandedYears] = useState({});
  const [expandedMonths, setExpandedMonths] = useState({});
  const [expandedWeeks, setExpandedWeeks] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // أسماء الأشهر بالعربي
  const monthsMap = {
    '01': 'يناير', '02': 'فبراير', '03': 'مارس', '04': 'أبريل',
    '05': 'مايو', '06': 'يونيو', '07': 'يوليو', '08': 'أغسطس',
    '09': 'سبتمبر', '10': 'أكتوبر', '11': 'نوفمبر', '12': 'ديسمبر'
  };

  useEffect(() => {
    // بيانات تجريبية مؤقتة
    const data = [
      {
        date: '2024-05-07',
        name: 'عصام الطراونة',
        time: '10:33',
        desc: 'قام في الموافقة على تسليم عضو الهيئة التدريسية: كلية الهندسة قسم هندسة الحاسوب'
      },
      {
        date: '2024-05-11',
        name: 'سليم المعايطة',
        time: '10:03',
        desc: 'قام في الموافقة على تسليم عضو الهيئة التدريسية: كلية الهندسة قسم هندسة الحاسوب'
      },
      {
        date: '2024-05-13',
        name: 'سليم المعايطة',
        time: '14:13',
        desc: 'قام في الموافقة على تسليم عضو الهيئة التدريسية: كلية الهندسة قسم هندسة الحاسوب'
      },
      {
        date: '2024-05-10',
        name: 'سليم المعايطة',
        time: '08:55',
        desc: 'قام في الموافقة على تسليم عضو الهيئة التدريسية: كلية الهندسة قسم هندسة الحاسوب'
      },
      {
        date: '2024-05-01',
        name: 'محمد كنعان',
        time: '09:13',
        desc: 'قام في الموافقة على تسليم عضو الهيئة التدريسية: كلية الهندسة قسم هندسة الحاسوب'
      },
      {
        date: '2024-05-20',
        name: 'سليم المعايطة',
        time: '10:45',
        desc: 'قام في الموافقة على تسليم عضو الهيئة التدريسية: كلية الهندسة قسم هندسة الحاسوب'
      },
      {
        date: '2024-05-29',
        name: 'سليم المعايطة',
        time: '10:13',
        desc: 'قام في الموافقة على تسليم عضو الهيئة التدريسية: كلية الهندسة قسم هندسة الحاسوب'
      },
      {
        date: '2024-04-20',
        name: 'سليم المعايطة',
        time: '12:13',
        desc: 'قام في الموافقة على تسليم عضو الهيئة التدريسية: كلية الهندسة قسم هندسة الحاسوب'
      },
    ];

    // إضافة أسماء الأسابيع و timestamp
    const dataWithWeeks = data.map(item => ({
      ...item,
      week: getWeekName(item.date),
      timestamp: new Date(`${item.date}T${item.time}:00`).getTime()
    }));

    setSubmissions(dataWithWeeks);
  }, []);

  // تحديد الأسبوع بناء على يوم الشهر (4 أسابيع ثابتة)
  const getWeekName = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    
    if (day <= 7) return 'الأسبوع الأول';
    if (day <= 14) return 'الأسبوع الثاني';
    if (day <= 21) return 'الأسبوع الثالث';
    return 'الأسبوع الرابع';
  };

  // استخراج رقم الأسبوع من اسمه للترتيب
  const extractWeekNumber = (weekName) => {
    const arabicMap = {
      'الأول': 1, 'الثاني': 2, 'الثالث': 3, 'الرابع': 4
    };
    
    for (const [key, value] of Object.entries(arabicMap)) {
      if (weekName.includes(key)) return value;
    }
    return 0;
  };

  // فتح أحدث سنة وشهر وأسبوع عند التحميل
  useEffect(() => {
    if (submissions.length === 0) return;
  
    const sorted = [...submissions].sort((a, b) => b.timestamp - a.timestamp);
    const latest = sorted[0];
    const [latestYear, latestMonth] = latest.date.split('-');
    const weekName = latest.week;
    const weekKey = `${latestYear}-${latestMonth}-${weekName}`;
  
    setExpandedYears({ [latestYear]: true });
    setExpandedMonths({ [`${latestYear}-${latestMonth}`]: true });
    setExpandedWeeks({ [weekKey]: true });
  }, [submissions]);

  // تجميع البيانات حسب السنة -> الشهر -> الأسبوع
  const groupedData = {};
  submissions.forEach((item) => {
    const [year, month] = item.date.split('-');
    const weekName = item.week;
    
    if (!groupedData[year]) groupedData[year] = {};
    if (!groupedData[year][month]) groupedData[year][month] = {};
    if (!groupedData[year][month][weekName]) groupedData[year][month][weekName] = [];
    
    groupedData[year][month][weekName].push(item);
  });

  // التحكم بفتح/إغلاق السنة
  const toggleYear = (year) => {
    setExpandedYears((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  // التحكم بفتح/إغلاق الشهر
  const toggleMonth = (year, month) => {
    const key = `${year}-${month}`;
    setExpandedMonths((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // التحكم بفتح/إغلاق الأسبوع
  const toggleWeek = (year, month, week) => {
    const key = `${year}-${month}-${week}`;
    setExpandedWeeks((prev) => ({ ...prev, [key]: !prev[key] }));
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
      <div className="manager-page w-full flex justify-between">
        <Sidebar_Manager open={open} setOpen={setOpen} />

        <div className={`manager-category-management ${open ? "mr-90 max-lg:mr-76" : "mr-20 max-lg:mr-16"} duration-200 flex-1 justify-items-center`}>
          <div className="search-bar mt-6 relative">
            <i className="fa-solid fa-magnifying-glass absolute top-5 ps-3 pointer-events-none" />
            <i className="fa-solid fa-bars absolute top-5 left-6 cursor-pointer" />
            <input 
              type="text" 
              className="w-90 h-14 p-2 ps-10 text-sm bg-indigo-100 outline-0 rounded-4xl max-lg:w-70" 
              placeholder="ابحث" 
            />
          </div>

          <div className="w-full grid grid-cols-1 mb-20">
            {Object.keys(groupedData).sort((a, b) => b - a).map((year) => (
              <div key={year}>
                <div 
                  onClick={() => toggleYear(year)} 
                  className='flex cursor-pointer items-center mt-10 mr-15 max-xl:mr-5 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200'
                >
                  <h2 className='text-3xl font-bold text-[#540C0F] max-lg:mr-4'>{year}</h2>
                  <i className={`fa-solid fa-chevron-${expandedYears[year] ? 'down' : 'right'} text-[#540C0F] text-sm mt-3 mr-3 transition-transform duration-300`}></i>
                </div>

                <AnimatePresence>
                  {expandedYears[year] && (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {Object.keys(groupedData[year])
                        .sort((a, b) => parseInt(b) - parseInt(a))
                        .map((month) => (
                          <div key={month} className="ml-10">
                            <div 
                              onClick={() => toggleMonth(year, month)} 
                              className='flex justify-between items-center w-40 h-12 py-2 px-4 mt-5 mr-15 bg-[#540C0F] rounded-3xl cursor-pointer max-xl:mr-5 hover:bg-[#3a090b] transition-colors duration-200'
                            >
                              <h2 className='text-2xl font-bold text-white'>{monthsMap[month]}</h2>
                              <i className={`fa-solid fa-chevron-${expandedMonths[`${year}-${month}`] ? 'down' : 'right'} text-white mt-3 text-sm transition-transform duration-300`}></i>
                            </div>

                            <AnimatePresence>
                              {expandedMonths[`${year}-${month}`] && (
                                <motion.div
                                  variants={containerVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                >
                                  {Object.keys(groupedData[year][month])
                                    .sort((a, b) => extractWeekNumber(a) - extractWeekNumber(b))
                                    .map((week) => (
                                      <div key={week} className="ml-10">
                                        <div 
                                          onClick={() => toggleWeek(year, month, week)} 
                                          className='flex justify-between items-center w-40 h-12 py-2 px-4 bg-[#8F2125] opacity-70 mt-5 mr-20 rounded-3xl cursor-pointer max-xl:mr-10 hover:opacity-100 transition-all duration-200'
                                        >
                                          <h2 className='text-lg text-white'>{week}</h2>
                                          <i className={`fa-solid fa-chevron-${expandedWeeks[`${year}-${month}-${week}`] ? 'down' : 'right'} text-white mt-3 text-sm transition-transform duration-300`}></i>
                                        </div>

                                        <AnimatePresence>
                                          {expandedWeeks[`${year}-${month}-${week}`] && (
                                            <motion.div
                                              variants={containerVariants}
                                              initial="hidden"
                                              animate="visible"
                                              exit="exit"
                                              className="ml-10"
                                            >
                                              {[...groupedData[year][month][week]]
                                                .sort((a, b) => b.timestamp - a.timestamp)
                                                .map((item, idx) => (
                                                  <motion.div
                                                    key={idx}
                                                    variants={itemVariants}
                                                    className='flex max-lg:flex-wrap justify-between gap-x-3 w-200 h-15 px-2 bg-gray-100 text-gray-400 border border-y-black border-x-transparent mt-5 mr-25 cursor-pointer relative max-xl:mr-15 max-lg:w-150 max-lg:h-30 max-lg:justify-around max-md:w-70 max-md:h-90 max-md:mr-10 max-md:flex-col max-md:items-center hover:bg-gray-200 transition-colors duration-200'
                                                  >
                                                    {idx === 0 && (
                                                      <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-md animate-pulse">
                                                        الأحدث
                                                      </div>
                                                    )}
                                                    <div className='flex gap-x-3 w-1/5 py-3 max-lg:w-1/4 max-md:w-full max-md:justify-center max-md:text-center max-md:h-1/5'>
                                                      <i className='fa-solid fa-user text-2xl text-black'></i>
                                                      <h2>{item.name}</h2>
                                                    </div>
                                                    <div className='w-1/5 py-3 max-lg:w-1/4 max-md:w-full max-md:text-center max-md:h-1/5 border-center-timeline border-right-timeline'>
                                                      <h2>التاريخ: {item.date}</h2>
                                                    </div>
                                                    <div className='w-1/5 py-3 max-lg:w-1/4 max-md:w-full max-md:text-center max-md:h-1/5 border-left-timeline'>
                                                      <h2>الوقت: {item.time}</h2>
                                                    </div>
                                                    <div className='text-start w-1/2 py-1 max-lg:w-full max-lg:flex max-md:justify-center max-md:text-center max-md:h-1/5'>
                                                      <h2>{item.desc}</h2>
                                                    </div>
                                                  </motion.div>
                                                ))}
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
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
    </section>
  );
}