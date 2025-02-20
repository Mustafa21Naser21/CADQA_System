import React from 'react';

export default function Sidebar_Employee({ open, setOpen }) {
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
          className="close-open-sidebar bg-white text-black w-8 h-8 rounded-full left-2 top-4 absolute cursor-pointer"
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
        <div className={`duration-300 mx-10 ${open ? "sidebar-content-manager" : "sidebar-icon-manager"}`}>
          {[
            { icon: "fa-house", title: "الرئيسية", border: true },
            { icon: "fa-file-circle-plus", title: "رفع ملف جديد" },
            { icon: "fa-file-lines", title: "التسليمات", border: true },
            { icon: "fa-folder-open", title: "إدارة الملفات" },
            { icon: "fa-chart-simple", title: "تقارير وإحصائيات", border: true },
            { icon: "fa-gear", title: "الإعدادات" },
          ].map((item, index) => (
            <div
              key={index}
              className={`mt-4 flex items-center pb-2 ${
                item.border ? "border-b border-white" : ""
              }`}
            >
              <i
                title={item.title}
                className={`fa-solid ${item.icon} text-2xl ml-4 duration-300 cursor-pointer ${
                  open ? "" : "translate-x-4 py-4"
                }`}
              />
              <h2
                className={`text-xl text-white cursor-pointer duration-300 ${
                  !open && "hidden"
                }`}
              >
                {item.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
