import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Sidebar_Employee from '../../Components/Sidebar/Employee';
import Select from "react-select";
import Swal from 'sweetalert2';


// select style
const customStyles = {
  control: (styles, state) => ({
    ...styles,
    backgroundColor: "white",
    color: "#8B171C",
    width: '250px',
    height: 'auto',
    minHeight: '50px',
    padding: '5px',
    border: '2px solid #8B171C',
    borderRadius: '5px',
    boxShadow: "none",
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    flexWrap: 'nowrap',
    outline: 'none', 
    "&:hover": {
      borderColor: "#8B171C", 
    },
    borderColor: state.isFocused ? "#8B171C" : "#8B171C", 
  }),
  menu: (base) => ({
    ...base,
    width: "250px",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#8B171C",
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? "#8B171C" : "white",
    color: isFocused ? "white" : "#8B171C",
    cursor: "pointer",
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "#FBEAEA",
    borderRadius: "12px",
    padding: "2px 6px",
    display: "flex",
    alignItems: "center",
    marginRight: "5px",
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "#8B171C",
    fontWeight: "bold",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "#8B171C",
    cursor: "pointer",
    ':hover': {
      backgroundColor: "#8B171C",
      color: "white",
    },
  }),
};


// بيانات اختيار الكلية 
const optionCollege = [
  { value: "it", label: "كلية تكنولوجيا المعلومات" },
  { value: "engineering", label: "كلية الهندسة" },
  { value: "medicine", label: "كلية الطب" },
  { value: "dentistry", label: "كلية طب الاسنان" },
  { value: "pharmacy", label: "كلية الصيدلة" },
  { value: "nursing", label: "كلية التمريض" },
  { value: "science", label: "كلية العلوم" },
  { value: "education", label: "كلية العلوم التربوية" },
  { value: "business", label: "كلية الاعمال" },
  { value: "arts", label: "كلية الاداب" },
  { value: "sharia", label: "كلية الشريعة" },
  { value: "law", label: "كلية الحقوق" },
];


// بيانات اختيار الفئة
const optionCategorey = [
  { value: "academic", label: " اعضاء الهيئة التدريسية" },
];

// بيانات اختيار عضو الهيئة التدريسية 
const optionAcademicStaff = [
  { value: "zakaria", label: "د . زكريا الطراونة" },
  { value: "ghaith", label: " د . غيث المحادين" },
  { value: "esraa", label: "د . اسراء الكفاوين " },
  { value: "hamza", label: " د . حمزة عيال سلمان" },
];

// بيانات اختيار نوع الوثيقة 
const optionTypeSubmission = [
  { value: "official", label: "الكتب الرسمية " },
  { value: "certificate", label: "تسليم شهادة" },
];

export default function File_Details() {
  const [open, setOpen] = useState(window.innerWidth > 640);
  const [fileNames, setFileNames] = useState([]);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileBase64, setFileBase64] = useState('');



  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

// دالة حذف الوثيقة
function handleDelete(){
  Swal.fire({
    icon: 'warning',
    title: ' حذف الوثيقة',
    text: ' هل انت متأكد من حذف الوثيقة ؟',
    confirmButtonColor: '#8B171C',
    confirmButtonText:'حذف',
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
  })
}

  return (

    <section>
    <div className="employee-page w-full flex justify-between">

      {/* الشريط الجانبي */}
      <Sidebar_Employee open={open} setOpen={setOpen} />

      {/* محتوى الصفحة */}
      <div className={`employee_file_details ${open ? 'mr-90 max-lg:mr-76' : 'mr-20 max-lg:mr-25'} duration-200 flex-1 mb-10`}>
        <div className={`${!open ? 'max-lg:mr-20 max-xl:mr-0' : 'mr-0'} w-full grid grid-cols-1`}>
          <h1 className='text-4xl text-[#540C0F] font-bold text-center mt-6'>تفاصيل الملف</h1>

          {/* خيارات الوثيقة */}
          <div className='flex gap-x-10 mt-20 max-xl:flex-wrap max-lg:flex-col'>

            {/* عنوان القسم */}
            <div className='mr-10 mt-10'>
              <h2 className='text-2xl font-bold text-[#540C0F]'>موقع الوثيقة</h2>
            </div>

            {/* اختيارات الكلية وعضو الهيئة */}
            <div>
              <Select styles={customStyles} options={optionCollege} isDisabled isMulti placeholder="اختر الكلية" />
              <Select className='mt-6' styles={customStyles} options={optionAcademicStaff} isDisabled isMulti placeholder="اختر عضو الهيئة التدريسية" />
            </div>

            {/* اختيارات الفئة ونوع الوثيقة */}
            <div>
              <Select styles={customStyles} options={optionCategorey} isDisabled placeholder="اختر الفئة" />
              <Select className='mt-6' styles={customStyles} options={optionTypeSubmission} isDisabled placeholder="اختر نوع الوثيقة" />
            </div>
          </div>

          {/* عنوان الوثيقة */}
          <div className='mr-10 mt-10'>
            <h2 className='text-2xl font-bold text-[#540C0F]'>عنوان الوثيقة</h2>
            <input className='w-75 h-14 text-[#540C0F] bg-gray-100 rounded-lg p-2 mt-4 border border-gray-300 outline-none' type="text" value={title} readOnly />
          </div>

          {/* وصف الوثيقة */}
          <div className='mr-10 mt-10'>
            <h2 className='text-2xl font-bold text-[#540C0F]'>وصف الوثيقة</h2>
            <textarea className='w-150 h-30 text-[#540C0F] bg-gray-100 rounded-lg p-2 mt-4 border border-gray-300 outline-none' value={description} readOnly />
          </div>

          {/* الملف المرفق */}
          <div className='mr-10 mt-10'>
            <h2 className='text-2xl font-bold text-[#540C0F]'>الملف المرفق</h2>
            <div className="flex items-center bg-red-200 rounded-2xl w-fit gap-4 mt-4 p-2">
              <i className="fa-solid fa-file text-[#540C0F] text-2xl" title="اختر ملف" />
              {fileNames.length > 0 ? (
                <div className="flex items-center gap-2 text-[#540C0F]">
                  <span>{fileNames[0]}</span>
                  <i className="fa-solid fa-trash text-[#540C0F]" title="حذف الملف" />
                </div>
              ) : (
                <span className="text-gray-500">لم يتم اختيار ملف</span>
              )}
            </div>
            <input type="file" className="hidden" accept=".doc,.docx,.pdf,.xls,.xlsx,.jpg,.jpeg,.png" />
          </div>

          {/* أزرار الحذف والتعديل */}
          <div className='mr-10 mt-20 flex justify-evenly max-md:flex-col max-md:gap-y-10'>
            <button className='w-50 h-14 bg-[#540C0F] text-white text-2xl rounded-2xl transition-opacity hover:opacity-80 cursor-pointer' 
            onClick={handleDelete}>
              حذف الوثيقة
            </button>
             
             <Link to={'/Employee_Edit_File'}>
            <button className='w-50 h-14 bg-[#540C0F] text-white text-2xl rounded-2xl transition-opacity hover:opacity-80 cursor-pointer' >
              تعديل الوثيقة
            </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  </section>
  );
}