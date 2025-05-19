import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Swal from 'sweetalert2';

export default function Login() {

  const [images] = useState([
    "/src/assets/cadqa login.svg",
    "/src/assets/loginPage1.svg",
    "/src/assets/loginPage 2.svg",
    "/src/assets/loginPage 3.svg",
  ]);

  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');  
  const [showSpinner, setShowSpinner] = useState(false); 
  const navigate = useNavigate();  

  // ============ دالة معالجة تسجيل الدخول ============
  const handleLogin = async (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    
    // التحقق من عدم ترك الحقول فارغة
    if (password === '' || username === '') {
      Swal.fire({
        title: 'خطأ',
        text: 'الرجاء تعبئة جميع الحقول',
        icon: 'error',
        confirmButtonText: 'حسنًا',
        confirmButtonColor: '#540C0F',
      });
      return; // إيقاف التنفيذ إذا كانت الحقول فارغة
    }

    // عرض مؤشر التحميل
    setShowSpinner(true);

    try {
      // إرسال بيانات الدخول إلى السيرفر
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      // إذا كانت الاستجابة ناجحة
      if (response.ok) {
        // حفظ حالة تسجيل الدخول في المتصفح
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userType', data.userType);

        // توجيه المستخدم حسب نوعه
        switch(data.userType) {
          case 'Manager':
            navigate('/Manager_Home'); // الانتقال لصفحة المدير
            break;
          case 'Employee':
            navigate('/Employee_Home'); // الانتقال لصفحة الموظف
            break;
          case 'Academic_Staff':
            navigate('/Academic_Staff_Home'); // الانتقال لصفحة الكادر الأكاديمي
            break;
          default:
            // عرض رسالة خطأ إذا كان نوع المستخدم غير معروف
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text: 'نوع المستخدم غير موجود',
              confirmButtonColor: '#8B171C'
            });
        }
      } else {
        // عرض رسالة خطأ إذا كانت بيانات الدخول غير صحيحة
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'اسم المستخدم او كلمة المرور غير صحيحة',
          confirmButtonColor: '#8B171C'
        });
      }
    } catch (error) {
      // معالجة الأخطاء التي قد تحدث أثناء الاتصال بالسيرفر
      console.error('Login Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'حدث خطأ أثناء الاتصال بالسيرفر',
        confirmButtonColor: '#8B171C'
      });
    } finally {
      // إخفاء مؤشر التحميل في جميع الحالات
      setShowSpinner(false);
    }
  };

  // ============ واجهة المستخدم ============
  return (
    <>
      {/* طبقة مؤشر التحميل */}
      {showSpinner && (
        <div className="fixed flex items-center justify-center z-50 inset-0 bg-black/50">
          <div className="animate-spin rounded-full h-20 w-20 border-8 border-white border-t-red-600"></div>
        </div>
      )}
      
      {/* قسم الرأس */}
      <header>
        <div className='flex justify-between bg-[#8B171C] text-white text-center px-2 h-20 max-lg:h-22 max-sm:block max-sm:h-54'>
          <div className='p-4 max-lg:pr-4'>
            <h1 className='text-xl'>جامعة مؤتة :: نحو بيئة تعليمية افضل</h1>
          </div>
          <div className='p-4 max-lg:pr-4'>
            <h1 className='text-xl'>نظام مركز التطوير الاكاديمي و ضمان الجودة</h1>
          </div>
          <div className='p-2 phone max-lg:pr-4 max-lg:w-76 max-lg:mt-2'>
            <h1 style={{letterSpacing:'2px'}} className='text-lg ltr english-text'>
              <i className="fa-solid fa-phone"/> +(962) 3 2372380
            </h1>
            <h1 className='text-lg english-text'>
              <a href="mailto:cadqac@mutah.edu.jo">cadqac@mutah.edu.jo</a> <i className="fa-solid fa-envelope"/>
            </h1>
          </div>
        </div>
      </header>

      {/* القسم الرئيسي */}
      <section>
        <div className="flex justify-between max-sm:block">
          {/* قسم عرض الصور المتحركة */}
          <div style={{width:'600px',height:'740px'}} className="slider-img bg-[#2B0B0B] w-1/2 relative">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    style={{ height: "740px", width:'600px'}}
                    src={src}
                    alt={`شريحة ${index}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* طبقة نص فوق الصور المتحركة */}
            <div style={{width:'600px',height:'740px',backgroundColor:'#2B0B0B'}} 
                 className='title-slider bg-[#2B0B0B] absolute opacity-70 z-10 top-0'>
              <h1 style={{lineHeight:'1.4'}} className='text-6xl font-bold text-white mt-52 ml-10 text-center max-xl:ml-0 max-lg:text-5xl'>
                نظام مركز التطوير الاكاديمي وضمان الجودة
              </h1>
            </div>
          </div>
          
          {/* قسم نموذج تسجيل الدخول */}
          <div className='w-1/2 flex justify-center translate-x-8 max-xl:translate-x-0 max-sm:w-full'>
            <div style={{width:'480px',height:'550px'}} 
                 className='login-form bg-[#F0EFEF] border-2 border-[#CFCFCF] text-center mt-20 rounded-3xl max-sm:mb-8'>
              
              {/* شعار النظام */}
              <img className='w-24 mr-48 mt-8 max-xl:mr-36 max-lg:mr-30' 
                   src="/src/assets/cadqa login.svg" 
                   alt="شعار CADQA" />
              
              <h1 className='text-4xl text-[#3F3F3F] english-text'>Log Into</h1>
              <h1 className='text-4xl text-[#3F3F3F] english-text'>CADQA System</h1>

              {/* نموذج إدخال البيانات */}
              <form onSubmit={handleLogin}>
                {/* حقل اسم المستخدم */}
                <input
                  className='w-76 h-14 mt-4 ltr bg-white rounded-xl px-2 outline-gray-300'
                  placeholder='اسم المستخدم'
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                {/* حقل كلمة المرور */}
                <input
                  className='w-76 h-14 mt-4 ltr bg-white rounded-xl px-2 outline-gray-300'
                  placeholder='كلمة المرور'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* رابط استعادة كلمة المرور */}
                <h2 className='mt-2 text-[#4C5A88] text-sm english-text text-end ml-22 transition-opacity hover:opacity-80 max-xl:ml-14 max-lg:ml-8'>
                  <a href=""> ? forgot your password </a>
                </h2>

                {/* زر تسجيل الدخول */}
                <button  
                  className='w-40 h-14 bg-[#8B171C] mt-8 text-xl rounded-xl text-white cursor-pointer transition-opacity hover:opacity-80'
                  type="submit">
                  تسجيل الدخول
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* footer  */}
      <footer>
        <div className='footer ltr bg-[#540C0F] h-52 text-white text-lg flex justify-between max-lg:h-60 max-sm:grid max-sm:grid-cols-1 max-sm:justify-items-center'>
          
          {/* قسم الشعار */}
          <div className="logo-footer w-1/5 mt-10 px-2 max-sm:w-auto">
            <div className='w-32 h-32 ml-10 px-2 rounded-full max-lg:ml-0'>
              <img className='w-2 h-2 rounded-full hidden' src="/src/assets/cadqa login.svg" alt="" />
            </div>
          </div>

          {/* قسم معلومات الاتصال */}
          <div className='contact-us w-2/5 mt-4 px-2 max-sm:w-auto'>
            <h1 className='text-2xl font-bold english-text'>Contact Us :</h1>
            <ul>
              <li className='mt-4 text-xl'>
                <i className="fa-solid fa-location-dot mr-2"/> الاردن-الكرك-الرمز البريدي (61710)
              </li>
              <li className='mt-4 text-xl'>
                <i className="fa-solid fa-phone mr-2"/> +(962) 3 2372380
              </li>
              <li className='mt-4 text-xl'>
                <i className="fa-solid fa-envelope mr-2"/> <a href="mailto:cadqac@mutah.edu.jo">cadqac@mutah.edu.jo</a>
              </li>
            </ul>
          </div>

          {/* قسم الأرقام الفرعية */}
          <div className='sub-number w-1/5 mt-4 px-2 max-sm:w-full max-sm:ml-20'>
            <h1 className='text-2xl font-bold'>الارقام الفرعية :</h1>
            <ul>
              <li className='mt-4 text-xl'>مدير المركز: 6150</li>
              <li className='mt-4 text-xl'>السكرتير: 6149</li>
              <li className='mt-4 text-xl'>مساعد المدير: 3289</li>
            </ul>
          </div>

          {/* قسم وسائل التواصل الاجتماعي */}
          <div className='follow-us w-1/5 mt-4 px-2 max-sm:w-full max-sm:ml-20'>
            <h1 className='mb-4 text-2xl font-bold english-text'>Follow Us :</h1>
            <a href=""><img className='w-16' src="/src/assets/facbook.png" alt="فيسبوك" /></a>
          </div>
        </div>

        {/* قسم حقوق النشر */}
        <div className="copy ltr bg-[#270405] h-24 text-white text-center flex flex-col justify-center p-4 max-sm:h-32">
          <h1 className="mt-2 text-xl opacity-80 english-text max-sm:px-4">
            حقوق النشر © 2025 - تم التطوير بواسطة
          </h1>
          <h2 className="text-white text-xl font-bold mt-2 mb-2 english-text max-sm:px-8">
            سيف حماد،  مصطفى ناصر،  إيمان معايطة،  سيف الشبول
          </h2>
        </div>
      </footer>
    </>
  )
}