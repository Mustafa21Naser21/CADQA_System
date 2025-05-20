import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Sidebar_Manager from '../../Components/Sidebar/Manager';
import { motion, AnimatePresence } from 'framer-motion';

export default function Faculty_Files() {
  const [open, setOpen] = useState(window.innerWidth > 640);
  const [menuIndex, setMenuIndex] = useState(null);
  const menuRefs = useRef([]);
  const [expandedSections, setExpandedSections] = useState({
    accreditation: true, // قسم الاعتماد مفتوح
    faculty: true, // قسم الاعضاء الهيئة التدريسية مفتوح
    facultyMembers: {},
    development: false, // قسم الاستحداث مغلق
    secondment: false // قسم الايفاد
  });

  // مصفوفة التسليمات لكل قسم
  const [sections, setSections] = useState({
    accreditation: [
      { title: 'اعتماد تخصص الهندسة المدنية /المياه والبيئة' },
      { title: 'اعتماد تخصص الهندسة الكيماوية' }
    ],
    faculty: [
      { 
        name: 'د. زكريا الطراونة',
        files: [
          { title: 'كتاب تعيين دكتور زكريا الطراونة' },
          { title: 'شهادة دورة برمجة c#' }
        ]
      },
      { 
        name: 'د. حمزة عيال سلمان',
        files: [
          { title: 'شهادة دورة برمجة c#' }
        ]
      },
      { 
        name: 'د. اسراء الكفاوين',
        files: [
          { title: 'شهادة دورة برمجة c#' }
        ]
      },
      { 
        name: 'د. غيث المحادين',
        files: [
          { title: 'شهادة دورة برمجة c#' }
        ]
      }
    ],
    development: [
      { title: 'شهادة دورة برمجة c#' }
    ],
    secondment: [
      { title: 'شهادة دورة برمجة c#' }
    ]
  });

  // تحديث القائمة الجانبية حسب حجم الشاشة
  useEffect(() => {
    const handleResize = () => setOpen(window.innerWidth > 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuIndex !== null && !menuRefs.current[menuIndex]?.contains(e.target)) {
        setMenuIndex(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuIndex]);

  // فتح/إغلاق القائمة المنبثقة
  const toggleMenu = (index, e) => {
    e.stopPropagation();
    setMenuIndex(menuIndex === index ? null : index);
  };

  // تبديل توسيع/طي القسم
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // تبديل توسيع/طي عضو هيئة التدريس
  const toggleFacultyMember = (memberName) => {
    setExpandedSections(prev => ({
      ...prev,
      facultyMembers: {
        ...prev.facultyMembers,
        [memberName]: !prev.facultyMembers[memberName]
      }
    }));
  };

  // دالة حذف الوثيقة
  function handleDelete() {
    Swal.fire({
      icon: 'warning',
      title: 'حذف الوثيقة',
      text: 'هل انت متأكد من حذف الوثيقة؟',
      confirmButtonColor: '#8B171C',
      confirmButtonText: 'حذف',
      showCloseButton: true,   
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "تم حذف الوثيقة بنجاح",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

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

  // دالة لعرض ملفات الوثائق
  const renderFacultyFile = (title, index) => (
    <motion.div
      variants={itemVariants}
      className='w-100 h-15 flex mr-15 mt-5 bg-gray-200 text-[#540C0F] border border-[#540C0F] rounded-xl relative hover:bg-gray-300 transition-colors duration-200 max-lg:mr-10 max-md:w-60 max-md:h-60 max-md:flex-col max-md:items-center max-md:justify-items-center'
    >
      {/* ملف أيقونة */}
      <div className='w-[12%] text-center max-md:w-full max-md:h-[20%]'>
        <img src="/src/assets/file icon.svg" className='mt-3 mr-2 w-7 cursor-pointer max-md:mt-2 max-md:mx-auto' alt="file icon" />
      </div>

      {/* العنوان */}
      <div className='w-[70%] flex items-center border border-x-[#540C0F] border-y-transparent px-2 cursor-pointer max-md:w-full max-md:h-[60%] max-md:border-x-transparent max-md:border-y-[#540C0F] max-md:py-2'>
        <Link to={'/Manager_File_Details'}>
          <h2 className='text-right max-md:text-center'>{title}</h2>
        </Link>
      </div>

      {/* أيقونات المعاينة والمزيد */}
      <div className='w-[18%] flex justify-center gap-x-3 relative max-md:w-full max-md:h-[20%] max-md:mt-2' ref={el => menuRefs.current[index] = el}>
        <img src="/src/assets/preview icon.svg" className='w-6 cursor-pointer' alt="preview" />
        <img
          src="/src/assets/more icon.svg"
          className='w-6 cursor-pointer'
          alt="more options"
          onClick={(e) => toggleMenu(index, e)}
        />

        {/* القائمة المنبثقة */}
        {menuIndex === index && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 bg-white border border-[#540C0F] rounded-lg shadow-md z-50 w-60 overflow-hidden more-menu max-md:right-auto max-md:left-0"
          >
            <Link to={'/Manager_Edit_File'}>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-x-3">
                <img src="/src/assets/edit icon.svg" className='w-5' alt="edit" />
                تعديل معلومات الوثيقة
              </div>
            </Link>

            <div onClick={handleDelete} className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-x-3 border-y border-[#540C0F]">
              <img src="/src/assets/delete icon.svg" className='w-5' alt="delete" />
              حذف الوثيقة
            </div>

            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-x-3">
              <img src="/src/assets/download icon.svg" className='w-5' alt="download" />
              تحميل الملف
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  // دالة لعرض بطاقة عضو هيئة التدريس
  const renderFacultyMember = (member, index) => (
    <React.Fragment key={index}>
      <motion.div
        onClick={() => toggleFacultyMember(member.name)}
        className='flex mb-2 justify-between items-center w-50 h-10 py-1 px-2 bg-[#8F2125] opacity-70 mt-5 mr-20 rounded-3xl cursor-pointer hover:opacity-100 transition-all duration-200 relative max-lg:mr-15 max-md:w-50 max-md:mx-auto'
      >
        <div className='w-15 h-15 bg-[#8F2125] rounded-full flex items-center justify-center absolute -right-10 top-1/2 transform -translate-y-1/2 border-4 border-white max-md:-right-5 max-md:w-12 max-md:h-12'>
          <i className='fa-solid fa-user text-white text-2xl max-md:text-xl'></i>
        </div>
        <h2 className='text-lg text-white pr-5 max-md:text-sm max-md:pr-8'>{member.name}</h2>
        <motion.i
          className='fa-solid fa-chevron-right text-white text-sm mt-1 transition-transform duration-300'
          animate={{ rotate: expandedSections.facultyMembers[member.name] ? 90 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </motion.div>

      <AnimatePresence>
        {expandedSections.facultyMembers[member.name] && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {member.files.map((file, fileIndex) => (
              renderFacultyFile(file.title, `faculty-${index}-${fileIndex}`)
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );

  return (
    <section>
      <div className="manager-page w-full flex justify-between">
        {/* الشريط الجانبي */}
        <Sidebar_Manager open={open} setOpen={setOpen} />

        {/* المحتوى الرئيسي */}
        <div className={`${open ? 'mr-90 max-lg:mr-76' : 'mr-20 max-lg:mr-16'} duration-200 flex-1 justify-items-center`}>

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

          {/* سهم الرجوع */}
          <div className='flex w-full flex-row-reverse ml-25 max-lg:ml-10 max-md:hidden'>
            <Link to={'/Manager_Categorey_Management'}>
              <i className="fa-solid fa-arrow-left text-[#540C0F] text-3xl cursor-pointer" />
            </Link>
          </div>
           
          <div className="w-full grid grid-cols-1 mb-10">
            {/* عنوان الصفحة */}
            <h1 className='text-4xl text-[#540C0F] font-bold text-center mt-5 mb-5 max-md:mt-10 max-md:mb-10'>كلية الهندسة</h1>

            {/* قسم الاعتماد */}
            <div className='mr-10 mt-10 mb-5 relative max-lg:mr-5'>
              <div 
                onClick={() => toggleSection('accreditation')}
                className={`flex gap-x-3 cursor-pointer ${open ? 'faculty_line' : 'faculty_line_close'}`}
              >
                <i className="fa-solid fa-folder text-[#540C0F] text-4xl relative">
                <motion.i
                  className={`fa-solid fa-chevron-right text-white absolute top-3 left-3 text-sm mt- transition-transform duration-200`}
                  animate={{ rotate: expandedSections.accreditation ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                </i>
                <h2 className='text-2xl text-gray-400 font-bold max-md:text-xl'> الاعتماد</h2>

              </div>
            </div>

            <AnimatePresence>
              {expandedSections.accreditation && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {sections.accreditation.map((submission, index) => (
                    renderFacultyFile(submission.title, index)
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* قسم الهيئة التدريسية */}
            <div className='mr-10 mt-10 mb-5 relative cursor-pointer max-lg:mr-5'>
              <div 
                onClick={() => toggleSection('faculty')}
                className={`flex gap-x-3 ${open ? 'faculty_doctors_line' : 'faculty_doctors_line_close'}`}
              >
                <i className="fa-solid fa-folder text-[#540C0F] text-4xl cursor-pointer relative">
                <motion.i
                  className={`fa-solid fa-chevron-right text-white absolute top-3 left-3 text-sm mt- transition-transform duration-200`}
                  animate={{ rotate: expandedSections.faculty? 90 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                </i>
                <h2 className='text-2xl text-gray-400 font-bold max-md:text-xl'> الهيئة التدريسية</h2>
              </div>
            </div>

            <AnimatePresence>
              {expandedSections.faculty && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {sections.faculty.map((member, index) => (
                    renderFacultyMember(member, index)
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* قسم الاستحداث */}
            <div className='mr-10 mt-10 mb-5 relative max-lg:mr-5'>
              <div 
                onClick={() => toggleSection('development')}
                className={`flex gap-x-3 cursor-pointer ${open ? 'faculty_line' : 'faculty_line_close'}`}
              >
                <i className="fa-solid fa-folder text-[#540C0F] text-4xl relative">
                <motion.i
                  className={`fa-solid fa-chevron-right text-white absolute top-3 left-3 text-sm mt- transition-transform duration-200`}
                  animate={{ rotate: expandedSections.development ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                </i>
                <h2 className='text-2xl text-gray-400 font-bold max-md:text-xl'> الاستحداث</h2>
              </div>
            </div>

            <AnimatePresence>
              {expandedSections.development && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {sections.development.map((file, index) => (
                    renderFacultyFile(file.title, `development-${index}`)
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* قسم الايفاد */}
            <div className='mr-10 mt-10 relative max-lg:mr-5'>
              <div 
                onClick={() => toggleSection('secondment')}
                className={`flex gap-x-3 cursor-pointer ${open ? 'faculty_line' : 'faculty_line_close'}`}
              >
                <i className="fa-solid fa-folder text-[#540C0F] text-4xl relative">
                <motion.i
                  className={`fa-solid fa-chevron-right text-white absolute top-3 left-3 text-sm mt- transition-transform duration-200`}
                  animate={{ rotate:expandedSections.secondment  ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                </i>
                <h2 className='text-2xl text-gray-400 font-bold max-md:text-xl'> الايفاد</h2>
              </div>
            </div>

            <AnimatePresence>
              {expandedSections.secondment && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {sections.secondment.map((file, index) => (
                    renderFacultyFile(file.title, `secondment-${index}`)
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}