import React, { useState, useEffect } from 'react';
import Sidebar_Academic_Staff from '../Sidebar/Sidebar_Academic_Staff';

export default function Academic_Staff_Notification() {
  const [open, setOpen] = useState(window.innerWidth > 640);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleResize = () => setOpen(window.innerWidth > 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // محاكاة API
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          message: "يرجى من مدرسين قسم علم الحاسوب القيام باعادة تسلم كتب التعيين الخاص فيهم",
        },
        {
          id: 2,
          message: "يرجى من مدرسين قسم علم الحاسوب القيام باعادة تسلم كتب التعيين الخاص فيهم",
        },
        {
          id: 3,
          message: "يرجى من مدرسين قسم علم الحاسوب القيام باعادة تسلم كتب التعيين الخاص فيهم",
        },
        {
          id: 4,
          message: "يرجى من مدرسين قسم علم الحاسوب القيام باعادة تسلم كتب التعيين الخاص فيهم",
        },
        {
          id: 5,
          message: "يرجى من مدرسين قسم علم الحاسوب القيام باعادة تسلم كتب التعيين الخاص فيهم",
        },
      ];
      setNotifications(mockData);
    }, 500);
  }, []);

  {/* التنبيهات */}
  const NotificationItem = ({ data }) => (
    <div className={`flex justify-start gap-x-5 mr-10 max-xl:gap-x-4 max-xl:translate-x-5 max-lg:translate-x-2 ${open ? 'max-lg:mr-0' : 'max-lg:mr-10'} max-md:mr-4`}>
      <img className='w-8' src='/src/assets/icon notification.svg' alt="notification" />
      <div className='w-150 h-20 max-lg:w-120 max-lg:h-25 bg-gray-100 flex gap-x-5 px-2 mt-5 text-[#540C0F] border border-black rounded-xl relative cursor-pointer max-md:w-60 max-md:h-60 max-md:flex-col max-md:gap-x-0 max-md:items-center'>
        <img className='w-8 max-md:w-10 max-md:mt-4' src='/src/assets/icon user.svg' alt="user" />
        <h2 className='text-black mt-2 max-md:text-center'>{data.message}</h2>
      </div>
      <img className='w-8' src='/src/assets/icon folder.svg' alt="folder" />
    </div>
  );

  return (
    <section>
      <div className="academic-staff-page w-full flex justify-between">
        <Sidebar_Academic_Staff open={open} setOpen={setOpen} />

        <div className={`academic-staff-notification ${open ? 'mr-90 max-lg:mr-76' : 'mr-20 max-lg:mr-16'} duration-200 flex-1`}>
          <div className="academic-staff-content mb-10 w-full grid grid-cols-1">
            <h1 className='text-center text-[#540C0F] mt-10 mb-15 relative text-4xl font-bold max-sm:mb-16'>
              التنبيهات
            </h1>

            {/* عرض التنبيهات */}
            <div>
              {notifications.length > 0 ? (
                notifications.map((item) => (
                  <NotificationItem key={item.id} data={item} />
                ))
              ) : (
                <p className="text-center mt-10 text-gray-500">لا توجد تنبيهات حالياً</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
