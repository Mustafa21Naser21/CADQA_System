import React from 'react'

export default function Sidebar_Employee({open,setOpen}) {
  return (
    <>
        <div
      style={{ height: "100vh" }}
      className={`fixed flex-1 duration-300 text-white rounded-l-4xl sidebar  ${
        open ? "w-90 max-lg:w-72 max-sm:w-72 max-sm:z-10" : "w-20 max-sm:w-16"
      }`}
    >
      {/* زر التحكم في الفتح والإغلاق */}
      <div className="close-open-sidebar bg-white text-black w-8 h-8 rounded-full left-2 top-4 absolute cursor-pointer"
        onClick={()=> setOpen(!open)}>
        <i className={`fa-solid fa-arrow-right  text-xl font-bold mt-2 mr-2 duration-300 ${!open && 'rotate-180'}`}/>
        </div>

      {/* الملف الشخصي */}
      <div className={`profile flex mt-6 duration-300 ${!open && 'scale-0'}`}>
            <div style={{fontSize:'80px'}} className='personal-photo w-36 h-32 rounded-full bg-white text-black mr-4'> 
              <i className="fa-solid fa-user py-6 px-8"/> 
              </div>
            <div className="name w-58 h-12 rounded-3xl translate-x-5 bg-white text-black text-lg font-bold p-2 mt-10 pr-4 max-lg:h-16 max-lg:mt-8 "> <h1> د.رقية عامر الصرايرة</h1></div>
        </div>

      {/* محتوى الشريط الجانبي */}
      <div className={`sidebar-content  duration-300 mx-10 text-xl translate-x-3 ${open ? "mt-10" : "mt-0 sidebar-icon max-sm:translate-x-4"}`}>
        <div className={` ${open ? 'border-b':'border-0'} border-white mt-4 flex items-center py-2`}>
          <i title="الصفحة الرئيسية" className="fa-solid fa-house cursor-pointer text-xl ml-4" />
          <h2 className={`text-xl text-white cursor-pointer  duration-300 ${!open && "scale-0"}`}>الرئيسية</h2>
        </div>

        <div className={` ${open ? 'border-b':'border-0'} border-white mt-4`}>
          <div className="flex items-center py-2">
            <i title="رفع ملف جديد" className="fa-solid fa-file-circle-plus cursor-pointer text-xl ml-4" />
            <h2 className={`text-xl text-white cursor-pointer  duration-300 ${!open && "scale-0"}`}>رفع ملف جديد</h2>
          </div>
          <div className="flex items-center py-2">
            <i title="تسليماتي السابقة" className="fa-solid fa-file-lines cursor-pointer text-xl ml-4" />
            <h2 className={`text-xl text-white cursor-pointer  duration-300 ${!open && "scale-0"}`}>تسليماتي السابقة</h2>
          </div>
        </div>

        <div className={` ${open ? 'border-b':'border-0'} border-white mt-4`}>
          <div className="flex items-center py-2">
            <i title="تقارير و احصائيات" className="fa-solid fa-chart-simple cursor-pointer text-xl ml-4" />
            <h2 className={`text-xl text-white cursor-pointer  duration-300 ${!open && "scale-0"}`}>تقارير و احصائيات</h2>
          </div>
          <div className="flex items-center py-2">
            <i title="الإعلانات و التنبيهات" className="fa-solid fa-bullhorn cursor-pointer text-xl ml-4" />
            <h2 className={`text-xl text-white cursor-pointer  duration-300 ${!open && "scale-0"}`}>الإعلانات و التنبيهات</h2>
          </div>
        </div>

        <div className="mt-4 flex items-center py-2">
          <i title="الإعدادات" className="fa-solid fa-gear cursor-pointer text-xl ml-4" />
          <h2 className={`text-xl text-white cursor-pointer  duration-300 ${!open && "scale-0"}`}>الإعدادات</h2>
        </div>
      </div>
    </div>
    </>
  )
}
