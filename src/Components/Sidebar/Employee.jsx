import React from 'react';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function Sidebar_Employee({ open, setOpen }) {

  const [uploadFile,setUploadFile]=useState(false);
  const [isOn, setIsOn] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
 
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

      // معالجة رفع الملف
    const handleUpload = () => {
      navigate('/Employee_UploadFile', { state: { file: selectedFile } });
      setUploadFile(false);   
    };


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
            <h1>أسامة الكفاوين</h1>
          </div>
        </div>    

        {/* محتوى الشريط الجانبي */}
        <div className={` mx-8 max-lg:mx-2  ${open ? "sidebar-content" : "sidebar-icon"}`}>
          {[
            { icon: "fa-house", title: "الرئيسية",src:'/Employee_Home', border: true },
            { icon: "fa-file-circle-plus", title: "رفع ملف جديد",action: () => { setUploadFile(true); } },
            { icon: "fa-file-lines", title: "التسليمات",src:'/Employee_Submissions', border: true },
            { icon: "fa-folder-open", title: "إدارة الملفات",src:'/Employee_Categorey_Management' },
            { icon: "fa-chart-simple", title: "تقارير وإحصائيات",src:'/Employee_Statistics' },
            { icon: "fa-bullhorn", title: " الاعلانات و التنبيهات",border:true,src:'/Academic_Staff_Notification',hasBell: true },
            { icon: "fa-solid fa-arrow-right-from-bracket", title: "تسجيل الخروج", src:'/' },
          ].map((item, index) => (
            <div
            key={index}
            className={`mt-2 flex items-center   transition-all ease-in-out box-border  ${
              item.border && open ? "border-b border-white " : "mt-0"
            } ${open ? "hover:bg-white hover:text-[#540C0F]  hover:cursor-pointer hover:rounded-xl px-2 py-3" : " p-0 mt-6 hover:text-[#540C0F]"}`}
            >
              <Link to={item.src || "#"} onClick={item.action}>
              <i
                title={item.title}
                className={`fa-solid ${item.icon} text-2xl ml-4 transition-all ease-in-out cursor-pointer ${
                  open ? "" : "translate-x-2 py-3 max-lg:translate-x-3 max-sm:translate-x-6 sidebar-icon-close"
                }`}
              />
              </Link>

              <Link to={item.src || "#"} onClick={item.action}>
              <h2
                className={`text-xl  cursor-pointer transition-all ease-in-out ${
                  !open && "hidden"
                }`}
              >
                {item.title}
              </h2>
              </Link>
            </div>
          ))}
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
