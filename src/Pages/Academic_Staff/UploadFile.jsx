import React, { useState, useEffect } from 'react';
import Sidebar_Academic_Staff from "../../Components/Sidebar/Academic_Staff";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const optionCollege = [
  { value: "", label: "كلية تكنولوجيا المعلومات" },
  { value: "", label: "كلية الرياضة" },
  { value: "", label: "كلية الهندسة" },
];

export default function UploadFile() {
  const [open, setOpen] = useState(window.innerWidth > 640);
  const [fileNames, setFileNames] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleIconClick = () => {
    document.querySelector("#fileInput").click();
  };

   // دالة تغيير الملف 
   const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      const allowedTypes = [
        "application/msword", // .doc
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
        "application/pdf", // .pdf
        "application/vnd.ms-excel", // .xls
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
        "image/jpeg", // .jpg, .jpeg
      ];
  
      const maxSizeInBytes = 20 * 1024 * 1024; // 20 ميجا بايت
  
      if (!allowedTypes.includes(selectedFile.type)) {
        Swal.fire({
          icon: 'error',
          title: 'نوع الملف غير مدعوم',
          text: 'الرجاء اختيار ملف من الأنواع التالية: doc, docx, pdf, xls, xlsx, jpg, jpeg',
          confirmButtonColor: '#8B171C'
        });
        return;
      }
  
      if (selectedFile.size > maxSizeInBytes) {
        Swal.fire({
          icon: 'warning',
          title: 'حجم الملف كبير',
          text: 'الحد الأقصى المسموح به هو 20 ميجابايت.',
          confirmButtonColor: '#8B171C'
        });
        return;
      }
  
      setFileNames([selectedFile.name]);
      setFiles([selectedFile]);
    }
  };
  

  // دالة حذف الوثيقة 
  const handleDeleteFile = () => {
    setFiles([]);
    setFileNames([]);  
    document.querySelector("#fileInput").value = "";
  };

    // دالة تسليم الوثيقة 
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!title || !desc || files.length === 0) {
      Swal.fire({
        title: 'خطأ',
        text: 'الرجاء تعبئة جميع الحقول وادخال الملف',
        icon: 'error',
        confirmButtonText: 'حسنًا',
        confirmButtonColor:'#540C0F',
      });
      return;
    }
  
    // محاكاة أن الملف تم رفعه وأخذ رابط
    const fileObjects = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file), // لاحقًا تستبدل هذا بالرابط اللي يرجع من الباك اند
    }));
  
    const newSubmission = {
      title,
      description: desc,
      date: new Date().toISOString().split('T')[0],
      status: 'معلق',
      files: fileObjects, // نخزن الكائنات بدل الأسماء فقط
    };
  
    const previous = JSON.parse(localStorage.getItem('submissions')) || [];
    previous.unshift(newSubmission);
    localStorage.setItem('submissions', JSON.stringify(previous));
  
    Swal.fire({
      title: 'تم التسليم',
      text: 'تم تسليم الوثيقة بنجاح',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
    });
  
    setTimeout(() => {
      navigate('/Academic_Staff_Previous_Submissions');
    }, 2000);
  };
  

  return (
    <section>
      <div className="academic-staff-page w-full flex justify-between">
        <Sidebar_Academic_Staff open={open} setOpen={setOpen}/> 

        <div className={`academic-staff-upload-file ${open ? 'mr-90 max-lg:mr-76' : 'mr-20 max-lg:mr-25'} duration-200 flex-1 justify-items-center mb-10`}>
          <div className={`${!open ? 'max-lg:mr-20 max-xl:mr-0' : 'mr-0'} w-full grid grid-cols-1 max-sm:justify-items-start`}>

            <h1 className='text-4xl text-[#540C0F] font-bold text-center mt-6 mb-10'>رفع ملف جديد</h1>

             {/* عنوان الوثيقة */}
            <div className='mr-10 mt-10'>
              <h2 className='text-2xl font-bold text-[#540C0F]'>عنوان الوثيقة</h2>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='w-75 h-14 text-[#540C0F] bg-gray-100 rounded-lg p-2 mt-4 outline-none border border-gray-300 max-lg:w-60' />
            </div>

             {/* وصف الوثيقة */}
            <div className='mr-10 mt-10'>
              <h2 className='text-2xl font-bold text-[#540C0F]'>وصف الوثيقة</h2>
              <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className='w-150 h-30 text-[#540C0F] bg-gray-100 rounded-lg p-2 mt-4 outline-none border border-gray-300' />
            </div>

          {/* الملف المرفق */}
          <div className='mr-10 mt-10 '>
              <h2 className='text-2xl font-bold text-[#540C0F]'>الملف المرفق</h2>
              <div className="flex items-center bg-red-200 rounded-2xl w-fit h-fit gap-4 mt-4 p-2">
                <i 
                  className="fa-solid fa-file text-[#540C0F] text-2xl cursor-pointer hover:text-[#8B171C]" 
                  onClick={handleIconClick} 
                  title="اختر ملف"
                />
                {fileNames.length > 0 ? (
                  <div className="flex items-center gap-2 text-[#540C0F]">
                    <span>{fileNames[0]}</span>
                    <i 
                      className="fa-solid fa-trash text-[#540C0F] cursor-pointer mx-2 hover:text-[#8B171C]" 
                      onClick={handleDeleteFile}
                      title="حذف الملف"
                    />
                  </div>
                ) : (
                  <span className="text-gray-500">لم يتم اختيار ملف</span>
                )}
              </div>
              
              {/* شريط التقدم */}
              {isUploading && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-[#540C0F] h-2.5 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}

              <input 
                className='hidden' 
                type="file" 
                id="fileInput" 
                onChange={handleFileChange} 
                accept=".doc,.docx,.pdf,.xls,.xlsx,.jpg,.jpeg,.png"
              />
            </div>

           {/* زر تسليم الوثيقة */}
            <div className='mr-10 mt-10 grid justify-items-center'>
              <button onClick={handleSubmit} className='w-50 h-14 bg-[#540C0F] text-white text-2xl rounded-2xl py-2 px-4 hover:opacity-80 cursor-pointer'>
                تسليم الوثيقة
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}