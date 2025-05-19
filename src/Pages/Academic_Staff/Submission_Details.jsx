import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useLocation } from 'react-router-dom';
import Sidebar_Academic_Staff from "../../Components/Sidebar/Academic_Staff";
import worker from 'pdfjs-dist/build/pdf.worker.min.js?url';


export default function Submission_Detalis() {
  const [open, setOpen] = useState(window.innerWidth > 640);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);

  const location = useLocation();
  const { title, date, status, description, files = [] } = location.state || {};

  // تحويل الملفات النصية إلى كائنات إذا لزم الأمر
  const normalizedFiles = files.map(file => 
    typeof file === 'string' ? { name: file, url: file } : file
  );

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleViewFile = (file) => {
    setSelectedFile(file); // الملف يحتوي url صحيح
    setShowPdfModal(true);
  };
  
  

  const handleCloseModal = () => {
    setShowPdfModal(false);
    setSelectedFile(null);
  };

  return (
    <section>
      <div className="academic-staff-page w-full flex justify-between">

        {/* الشريط الجانبي */}
        <Sidebar_Academic_Staff open={open} setOpen={setOpen} />

        <div className={`academic-staff-submission-detalis ${open ? 'mr-90 max-lg:mr-76 ' : 'mr-20 max-lg:mr-25 '} duration-200 flex-1 justify-items-center mb-10`}>
          <div className={`${!open ? 'max-lg:mr-20 max-xl:mr-0' : 'mr-0'} w-full grid grid-cols-1 max-sm:justify-items-start`}>
            <h1 className='text-4xl text-[#540C0F] font-bold text-center mt-6'>تفاصيل التسليم</h1>

            {/* عنوان الوثيقة */}
            <div className='mr-10 mt-10'>
              <h2 className='text-2xl font-bold text-[#540C0F]'>عنوان الوثيقة</h2>
              <input readOnly className='w-75 h-14 text-[#540C0F] bg-gray-100 rounded-lg p-2 mt-4 outline-none border border-gray-300 max-lg:w-60' value={title || ''} />
            </div>

            {/* وصف الوثيقة */}
            <div className='mr-10 mt-10'>
              <h2 className='text-2xl font-bold text-[#540C0F]'>وصف الوثيقة</h2>
              <textarea readOnly className='w-150 h-30 text-[#540C0F] bg-gray-100 rounded-lg p-2 mt-4 outline-none border border-gray-300' value={description || ''} />
            </div>
             
             {/* عرض الملفات */}
            <div className='mr-10 mt-10 max-lg:mr-2 max-sm:mr-0'>
              <h2 className='text-2xl font-bold text-[#540C0F]'>الملفات المرفقة</h2>

              {normalizedFiles.map((file, index) => (         
                <div key={index} className="flex items-center text-[#540C0F] bg-red-200 rounded-2xl w-fit h-fit gap-4 mt-4 p-2">
                  <i className="fa-solid fa-file text-[#540C0F] text-2xl " />
                  <span className=''>{file.name || file}</span>
                  <i 
                    className="fa-solid fa-eye cursor-pointer text-xl  hover:text-[#8B171C]" 
                    onClick={() => handleViewFile(file)} 
                  />
                </div>
              ))}
            </div>

            {/* حالة التسليم + نص ملاحظات الموظف */}
            <div className='flex gap-x-80 mr-10 mb-10 mt-15 max-md:flex-col max-xl:gap-x-30 max-lg:gap-x-15 max-lg:gap-y-10 max-lg:items-start max-lg:mr-2 max-sm:mr-0'>
              {/* مربع الملاحظات */}
              <div className=''>
                <h2 className='text-2xl font-bold text-[#540C0F] mb-4'>الملاحظات</h2>
                <textarea
                  readOnly
                  className='w-100 max-xl:w-70 max-lg:w-60 h-30 text-[#540C0F] bg-gray-100 rounded-lg p-2 outline-none border border-gray-300'
                  placeholder='لا يوجد'
                  rows="5"
                ></textarea>
              </div>

              {/* حالة التسليم */}
              <div className='w-full max-w-md mt-12'>
                <h2 className='text-2xl font-bold text-[#540C0F] mb-5'>حالة التسليم</h2>
                <div className='space-y-3'>
                  {status === 'مقبول' && <h2 className='bg-green-500 text-white text-xl w-28 rounded-3xl text-center py-2'>مقبول</h2>}
                  {status === 'مرفوض' && <h2 className='bg-red-500 text-white text-xl w-28 rounded-3xl text-center py-2'>مرفوض</h2>}
                  {status === 'معلق' && <h2 className='bg-orange-400 text-white text-xl w-28 rounded-3xl text-center py-2'>معلق</h2>}
                </div>
              </div>
            </div>

            {/* زر إعادة التسليم */}
            {status === 'مرفوض' && (
              <div className='mr-10 mt-10 grid justify-items-center translate-x-15 max-xl:translate-x-5 max-lg:mr-4 max-sm:translate-x-0 max-sm:mr-6'>
                <button 
                  onClick={handleResubmit}
                  className='w-60 h-14 bg-[#540C0F] text-white text-2xl rounded-2xl py-2 px-2 cursor-pointer transition-opacity hover:opacity-80'
                >
                  أعد القيام بالتسليم
                </button>
              </div>
            )}

            {/* Modal لعرض ملف PDF */}
            {showPdfModal && selectedFile && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                <div className="bg-white p-4 rounded-lg w-1/2 h-3/4 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{selectedFile.name || selectedFile}</h3>
                    <button 
                      onClick={handleCloseModal}
                      className="text-2xl text-gray-400 cursor-pointer"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="flex-1 overflow-auto">
                  <Worker workerUrl={worker}>
  {selectedFile?.url ? (
    <Viewer  
    fileUrl={selectedFile.url}
    defaultScale={1.5} // تكبير العرض الافتراضي بنسبة 150%
   />
  ) : (
    <div className="flex justify-center items-center h-full">
      <p>لا يمكن عرض محتوى الملف</p>
    </div>
  )}
</Worker>


                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}