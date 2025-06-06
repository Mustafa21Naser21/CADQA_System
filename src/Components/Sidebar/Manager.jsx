import React,{useState,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import Select from "react-select";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

    

const customStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    color: "#8B171C",
    width:'200px',
    height:'50px',
    padding:'5px',
    border:'2px solid #8B171C',
    borderRadius:'5px',
    boxShadow: "none",
    "&:hover": { borderColor: "#8B171C" },
  }),
  menu: (base) => ({
    ...base,
    width: "200px", // اجعل القائمة بنفس حجم select
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
const optionMainCategory = [
  { value: "", label: "كلية تكنولوجيا المعلومات" },
  { value: "", label: "كلية الرياضة" },
  { value: "", label: "كلية الهندسة" },

];

{/* بيانات اختيار المجلد الفرعي */}
const optionSubFolder = [
  { value: "", label: "كلية تكنولوجيا المعلومات" },
  { value: "", label: "كلية الرياضة" },
  { value: "", label: "كلية الهندسة" },

];

export default function Sidebar_Manager({ open, setOpen }) {

  const [addCategory,setAddCategory]=useState(false);
  const [addFolder,setAddFolder]=useState(false);
  const [uploadFile,setUploadFile]=useState(false);
  const [isOn, setIsOn] = useState(false);
  const [showActivites,setShowActivites] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
 
  // اغلاق سجل النشاطات بعد 5 ثواني من الضغط
  useEffect(() => {
    if (showActivites) {
      const timer = setTimeout(() => {
        setShowActivites(false);
      }, 5000); 
  
      return () => clearTimeout(timer);
    }
  }, [showActivites]);

    // معالجة اختيار الملف
    const handleFileChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setSelectedFile(e.target.files[0]);
      }
    };
  
    // معالجة رفع الملف
    const handleUpload = () => {
        navigate('/Manager_UploadFile', { state: { file: selectedFile } });
        setUploadFile(false);   
    };

  const menuItems = [
    { icon: "fa-house", title: "الرئيسية", src: "/Manager_Home", border: true },
    { icon: "fa-file-circle-plus", title: "رفع ملف جديد", action: () => { setUploadFile(true); setAddCategory(false); setAddFolder(false); }},
    { icon: "fa-file-lines", title: "التسليمات", src: "/Manager_Submissions" },
    { icon: "fa-clock-rotate-left", title: "سجل النشاطات", action: () => { setShowActivites(!showActivites); }, border: true },
    { icon: "fa-folder-open", title: "إدارة الملفات",src:'/Manager_Categorey_Management' },
    { icon: "fa-file-pen", title: "إنشاء فئة جديدة", action: () => { setAddCategory(true); setAddFolder(false); setUploadFile(false); }},
    { icon: "fa-folder-plus", title: "إضافة مجلد جديد", action: () => { setAddFolder(true); setAddCategory(false); setUploadFile(false); }, border: true },
    { icon: "fa-chart-simple", title: "تقارير وإحصائيات", src: "/Manager_Statistics" },
    { icon: "fa-bullhorn", title: "الإعلانات والتنبيهات", src: "", border: true },
    { icon: "fa-file-circle-xmark", title: "المحذوفة مؤخرًا", src: "" },
    { icon: "fa-solid fa-arrow-right-from-bracket", title: "تسجيل الخروج", src:'/' },
  ];

  return (
    <>
    <div
      style={{ height: "100vh" }}
      className={`fixed flex-1 duration-300 text-white rounded-l-4xl sidebar ${
        open ? "w-90 max-lg:w-72 max-sm:w-72 max-sm:z-10" : "w-20 max-sm:w-16"
    }`}
    >
      {/* زر التحكم في الفتح والإغلاق */}
      <div
        className={`close-open-sidebar bg-white text-black w-8 h-8 rounded-full ${open ? 'left-2' : 'left-6 max-sm:left-4'} top-4 absolute cursor-pointer`}
        onClick={() => setOpen(!open)}
      >
        <i
          className={`fa-solid fa-arrow-right text-xl font-bold mt-2 mr-2 duration-300 ${
            !open && "rotate-180"
          }`}
        />
      </div>

      {/* الملف الشخصي */}
      <div className={`profile flex mt-6 mb-8 duration-300 ${!open && "scale-0"}`}>
        <div
          style={{ fontSize: "80px" }}
          className="personal-photo w-36 h-32 rounded-full bg-white text-black mr-4"
        >
          <i className="fa-solid fa-user py-6 px-8" />
        </div>
        <div className="name w-58 h-12 rounded-3xl translate-x-5 bg-white text-black text-lg font-bold p-2 mt-10 pr-6 max-lg:h-16 max-lg:mt-8">
          <h1>بكر محمد العضاية</h1>
        </div>
      </div>

      {/* محتوى الشريط الجانبي */}
      <SimpleBar
        style={{ height: 'calc(100% - 170px)', padding: open ? '0 10px' : '0' }}
        className={`flex flex-col flex-1 duration-300  ${open ? "sidebar-content-manager py-3" : " py-0 sidebar-icon-manager justify-between items-center"}`}
      >
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center transition-all ease-in-out box-border mr-4 ${
              item.border && open ? "border-b border-white" : ""
            } ${open ? "hover:bg-white hover:text-[#540C0F] hover:rounded-2xl p-2   " : "p-0 justify-center my-2"}`}
          >
            <Link
              to={item.src || "#"}
              onClick={item.action}
              className="flex items-start w-full"
            >
              
              <i
                title={item.title}
                className={`fa-solid ${item.icon} text-2xl ml-4 hover:text-[#540C0F] mt-4 ${!open ? "mx-auto" : ""} ${open ? "" : "translate-x-4"}`}
              />
            
              {open && (
                <div className="flex flex-col my-3">
                  <h2 className="text-xl">{item.title}</h2>
                  {item.title === "سجل النشاطات" && showActivites && (
                    <div className="mt-2">
                      <h3 className="text-gray-400 text-sm mb-2 hover:text-[#540C0F] cursor-pointer">سجل الزمني</h3>
                      <h3 className="text-gray-400 text-sm hover:text-[#540C0F] cursor-pointer">سجل الموظفين</h3>
                    </div>
                  )}
                </div>
              )}
            </Link>
          </div>
        ))}
        
      </SimpleBar>
    </div>

        {/*اضافة فئة جديد */}
        <div className={`add-category fixed inset-0 z-50 ${addCategory ? "flex" : "hidden"} items-center justify-center`} >

          {/* Overlay الخلفية الشفافة */}
        <div className="absolute inset-0 bg-black/70"></div>
        
        <div className={`bg-gray-100 w-125 h-90 fixed top-1/4 rounded-2xl duration-300 ${open ? 'right-140 max-xl:right-110 max-lg:right-65': 'right-110 max-xl:right-70 max-lg:right-40'} max-xl:top-35 max-md:w-80 max-md:right-20`}>
        
          <h1 className='text-3xl mt-4 text-[#540C0F] text-center font-bold'>إضافة فئة جديدة</h1>

          <h2 className='text-lg text-center text-[#540C0F] mt-15 mb-4'>عنوان الفئة</h2>
          {/* ادخال عنوان الفئة input*/}
         <div className='grid justify-items-center'>
         <input type="text" className='w-72 h-14 bg-white text-black p-2 outline-none border border-gray-400 rounded-lg ' />
         </div>


         {/*اضافة الفئة button */}
         <div className='grid justify-items-center mt-20'>
          <button className='w-50 h-14 bg-[#540C0F] text-white font-bold rounded-3xl text-xl cursor-pointer transition-opacity hover:opacity-80 '>إضافة الفئة</button>
         </div>

          {/*زر الاغلاق */}
         <div className='absolute top-2 left-2 cursor-pointer'
         onClick={()=>setAddCategory(false)}>
         <i className="fa-solid fa-xmark text-gray-400"/>
         </div>

        </div>
      </div>
       
       {/* اضافة مجلد جديد */}
      <div className={`add-folder fixed inset-0 z-50 ${addFolder ? "flex" : "hidden"} items-center justify-center`}>

        {/* Overlay الخلفية الشفافة */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className={`bg-gray-100 w-150 h-95 fixed top-1/4 rounded-2xl duration-300 ${open ? 'right-130 max-xl:right-95 max-lg:right-60' : 'right-100 max-xl:right-60  max-lg:right-40'} max-xl:top-40  max-lg:w-130 max-md:right-17 max-md:w-85 max-md:h-145 max-md:top-30` }>
        <h1 className='text-3xl mt-4 text-[#540C0F] text-center font-bold'>إضافة مجلد جديد</h1>
        <div className='flex justify-between max-md:block max-md:pr-6'>
          <div className='pr-6 mt-6'>
            <h2 className='text-lg text-[#540C0F] mb-2 mr-2'>عنوان المجلد</h2>

             {/* ادخال عنوان المجلد input */}
            <input type="text" className='w-60 h-14 bg-white text-black p-2 outline-none border border-gray-400 rounded-lg' />

          </div>
          {/* اختيار الفئة الرئيسية و المجلد الفرعي select */}
          <div className='pr-6 mt-8'>

            <h3 style={{fontSize:'12px'}} className=' text-gray-700 mb-2 '>*يرجى اختيار الفئة التي سيتم ربط هذا المجلد بها.</h3>
            <Select  styles={customStyles} options={optionMainCategory} isSearchable={false} placeholder="الفئة الرئيسية "  />

            <h3 style={{fontSize:'12px'}} className=' text-gray-700 mb-2 mt-4 ml-4'>اختر المجلد الحاوي إذا كنت تريد تخزين المجلد داخله (إختياري)</h3>
            <Select  styles={customStyles} options={optionSubFolder} isSearchable={false} placeholder="المجلد الفرعي"  />

          </div>
        </div>

        {/*اضافة المجلد button */}
        <div className='grid justify-items-center mt-8'>
          <button className='w-50 h-14 bg-[#540C0F] text-white font-bold rounded-3xl text-xl cursor-pointer transition-opacity hover:opacity-80 '>إضافة المجلد</button>
         </div>

         {/* زر الاغلاق */}
      <div className='absolute top-2 left-2 cursor-pointer'
         onClick={()=>setAddFolder(false)}>
         <i className="fa-solid fa-xmark text-gray-400"/>
      </div>

       </div>
      </div>

      {/*  تحميل الملف */}
      <div className={`upload-file fixed inset-0 z-50 ${uploadFile ? "flex" : "hidden"} items-center justify-center`}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className={`bg-gray-100 w-120 h-90 fixed top-1/4 rounded-2xl duration-300 ${open ? 'right-140 max-xl:right-110 max-lg:right-80': 'right-110 max-xl:right-65 max-lg:right-50'}  max-xl:top-35 max-lg:top-50  max-md:right-20 max-lg:w-110 max-md:w-80`}>
          <div className='grid grid-col-1 justify-items-center'>
            {/* منطقة سحب وإسقاط الملف */}
            <label 
              htmlFor="file-upload"
              className='grid justify-items-center cursor-pointer'
            >
              <img src="/src/assets/icon-upload.png" className='w-25 h-25 mt-10'/>
              <h2 className='text-gray-400 text-lg mt-4'>
                {selectedFile ? selectedFile.name : 'قم برفع الوثيقة أو اسحبها وأسقطها هنا'}
              </h2>
              <input
                id="file-upload"
                type="file"
                className='hidden'
                onChange={handleFileChange}
              />
            </label>

            {/* زر تحميل الملف */}
            <button 
              onClick={handleUpload}
              className='w-45 h-14 bg-[#540C0F] mt-10 text-white font-bold rounded-xl text-xl cursor-pointer transition-opacity hover:opacity-80'
            >
              تحميل الملف
            </button>
         {/*on off التصنيف الذكي */}
         <div className='flex mt-4'>
        <button
       onClick={() => setIsOn(!isOn)}
       className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-all mt-4 cursor-pointer 
        ${isOn ? "bg-[#8B171C]" : "bg-gray-400"}`} style={{direction:'ltr'}}  
        >

        <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all 
          ${isOn ? "translate-x-7" : "translate-x-0"}`}
          style={{transform:'translateX(-5px)'}}  
          >
        <img src="/src/assets/star.svg" className='mt-1 ml-1 w-4' />
        </div>

      <span className="absolute left-2 text-xs text-white"></span>
      <span className="absolute right-2 text-xs text-white"></span>
    </button>
    <h3 className='text-gray-400 mt-4 mr-2'>التصنيف الذكي</h3>

    </div>

        {/* زر الاغلاق */}
        <div className='absolute top-2 left-2 cursor-pointer'
         onClick={()=>setUploadFile(false)}>
         <i className="fa-solid fa-xmark text-gray-400"/>
       </div>

          </div>
        </div>
      </div>

  </>  
  );
}
