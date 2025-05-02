import React, { useState, useEffect } from 'react';
import Select from "react-select";
import Swal from 'sweetalert2';
import Sidebar_Manager from '../../Components/Sidebar/Manager';

// أنماط مخصصة لـ Select
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

// بيانات الاختيارات
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

const optionCategorey = [
  { value: "academic", label: "اعضاء الهيئة التدريسية" },
];

const optionAcademicStaff = [
  { value: "zakaria", label: "د. زكريا الطراونة" },
  { value: "ghaith", label: "د. غيث المحادين" },
  { value: "esraa", label: "د. اسراء الكفاوين" },
  { value: "hamza", label: "د. حمزة عيال سلمان" },
];

const optionTypeSubmission = [
  { value: "official", label: "الكتب الرسمية" },
  { value: "certificate", label: "تسليم شهادة" },
];

export default function UploadFile() {
  const [open, setOpen] = useState(window.innerWidth > 640);
  const [fileNames, setFileNames] = useState([]);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileBase64, setFileBase64] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedType, setSelectedType] = useState(null);
  
 

  // الحقول المتغيرة حسب الاختيار
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAcademicStaff, setSelectedAcademicStaff] = useState([]);
  const [selectedColleges, setSelectedColleges] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // دالة اختيار الملف
  const handleIconClick = () => {
    document.querySelector("#fileInput").click();
  };

  // دالة تغيير الملف
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      const allowedTypes = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "image/jpeg",
        "image/png"
      ];
  
      const maxSizeInBytes = 20 * 1024 * 1024; // 20MB
  
      if (!allowedTypes.includes(selectedFile.type)) {
        Swal.fire({
          icon: 'error',
          title: 'نوع الملف غير مدعوم',
          text: 'الرجاء اختيار ملف من الأنواع التالية: doc, docx, pdf, xls, xlsx, jpg, jpeg, png',
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
  
      // قراءة الملف وتحويله إلى base64
      const reader = new FileReader();
      reader.onloadstart = () => {
        setIsUploading(true);
        setUploadProgress(0);
      };
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(progress);
        }
      };
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setFileBase64(base64String);
        setIsUploading(false);
        setUploadProgress(100);
      };
      reader.onerror = () => {
        setIsUploading(false);
        Swal.fire({
          icon: 'error',
          title: 'خطأ في القراءة',
          text: 'حدث خطأ أثناء قراءة الملف',
          confirmButtonColor: '#8B171C'
        });
      };
      reader.readAsDataURL(selectedFile);
  
      setFileNames([selectedFile.name]);
      setFiles([selectedFile]);
    }
  };

  // دالة حذف الملف
  const handleDeleteFile = () => {
    setFiles([]);
    setFileNames([]);
    setFileBase64('');
    setUploadProgress(0);
    document.querySelector("#fileInput").value = "";
  };

  // دالة إرسال الملف
  const handleSubmit = async () => {
    if (
      !selectedCategory ||
      selectedAcademicStaff.length === 0 ||
      selectedColleges.length === 0 ||
      files.length === 0 ||
      fileBase64 === '' ||
      title.trim() === '' ||
      description.trim() === '' ||
      !selectedType
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'بيانات ناقصة',
        text: 'يرجى تعبئة جميع الحقول وإرفاق ملف.',
        confirmButtonColor: '#8B171C'
      });
      return;
    }
  
    const payload = {
      colleges: selectedColleges.map(college => college.value),
      category: selectedCategory.value,
      academicStaff: selectedAcademicStaff.map(staff => staff.value),
      type: selectedType.value,
      fileName: fileNames[0],
      fileContent: fileBase64,
      title: title,
      description: description
    };
  
    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      // محاكاة عملية الرفع للسيرفر
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      clearInterval(interval);
      setUploadProgress(100);
      
      const result = await response.json();
  
      if (response.ok) {
        Swal.fire({
          title: 'تم الرفع',
          text: 'تم رفع الوثيقة بنجاح.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        });

        // إعادة تعيين القيم
        resetForm();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'فشل الرفع',
          text: result.message || 'حدث خطأ أثناء رفع الوثيقة.',
          confirmButtonColor: '#8B171C'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ في الاتصال',
        text: 'تأكد من الاتصال بالإنترنت أو راجع الخادم.',
        confirmButtonColor: '#8B171C'
      });
      console.error('Upload Error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // دالة إعادة تعيين النموذج
  const resetForm = () => {
    setFiles([]);
    setFileNames([]);
    setFileBase64('');
    setTitle('');
    setDescription('');
    setSelectedCategory(null);
    setSelectedAcademicStaff([]);
    setSelectedColleges([]);
    setSelectedType(null);
    setUploadProgress(0);
    document.querySelector("#fileInput").value = "";
  };

  return (
    <section>
      <div className="manager-page w-full flex justify-between">
        <Sidebar_Manager open={open} setOpen={setOpen}/>
        <div className={`${open ? 'mr-90 max-lg:mr-76' : 'mr-20 max-lg:mr-25'} duration-200 flex-1 justify-items-center mb-10`}>
          <div className={`${!open ? 'max-lg:mr-20 max-xl:mr-0' : 'mr-0'} w-full grid grid-cols-1 max-sm:justify-items-start`}>
            <h1 className='text-4xl text-[#540C0F] font-bold text-center mt-6'>رفع ملف جديد</h1>

            <div className='flex gap-x-10 mt-20 max-xl:gap-x-5 max-xl:flex-wrap max-lg:flex-col'>
              <div className='mr-10 max-lg:mr-2 max-sm:mr-0'>
                <h2 className='text-2xl font-bold text-[#540C0F]'>اختر الفئة و المجلد</h2>
                <h3 className='textsm text-gray-400 mt-2 mb-4'>* حدد المجلد الفرعي (إن وُجد)</h3>
              </div>

              <div>
                {/* اختيار الكلية */}
                <Select
                  styles={customStyles}
                  options={optionCollege}
                  isSearchable={false}
                  placeholder="اختر الكلية"
                  onChange={(options) => setSelectedColleges(options)}
                  isMulti
                  value={selectedColleges}
                />
                                              
                {/* اختيار عضو الهيئة التدريسية */}
                {selectedCategory?.value === "academic" && (
                  <Select
                    className='mt-6'
                    styles={customStyles}
                    options={optionAcademicStaff}
                    isSearchable={false}
                    placeholder="اختر عضو الهيئة التدريسية"
                    onChange={(options) => setSelectedAcademicStaff(options)}
                    isMulti
                    value={selectedAcademicStaff}
                  />
                )}
              </div>

              <div>
                {/* اختيار الفئة */}
                <Select
                  className='max-xl:mr-63 max-lg:mr-0 max-xl:mt-5'
                  styles={customStyles}
                  options={optionCategorey}
                  isSearchable={false}
                  placeholder="اختر الفئة"
                  onChange={(option) => {
                    setSelectedCategory(option);
                    setSelectedAcademicStaff([]);
                  }}
                  value={selectedCategory}
                />
                
                {/* اختيار نوع الوثيقة */}
                {selectedAcademicStaff?.length > 0 && (
                  <Select
                    className='mt-6 max-xl:mr-63 max-lg:mr-0 max-xl:mt-5'
                    styles={customStyles}
                    options={optionTypeSubmission}
                    isSearchable={false}
                    placeholder="اختر نوع الوثيقة"
                    onChange={(option) => setSelectedType(option)}
                    value={selectedType}
                  />
                )}
              </div>
            </div>

            {/* عنوان الوثيقة */}
            <div className='mr-10 mt-10 max-lg:mr-2 max-sm:mr-0'>
              <h2 className='text-2xl font-bold text-[#540C0F]'>عنوان الوثيقة</h2>
              <input 
                className='w-75 h-14 text-[#540C0F] bg-gray-100 rounded-lg p-2 mt-4 outline-none border border-gray-300 max-lg:w-60' 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="أدخل عنوان الوثيقة"
              />
            </div>

            {/* وصف الوثيقة */}
            <div className='mr-10 mt-10 max-lg:mr-2 max-sm:mr-0'>
              <h2 className='text-2xl font-bold text-[#540C0F]'>وصف الوثيقة</h2>
              <textarea 
                className='w-150 h-30 text-[#540C0F] bg-gray-100 rounded-lg p-2 mt-4 outline-none border border-gray-300 max-xl:w-120 max-lg:w-100 max-sm:w-70 max-sm:h-40'
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                placeholder="أدخل وصف الوثيقة"
              />
            </div>

            {/* الملف المرفق */}
            <div className='mr-10 mt-10 max-lg:mr-2 max-sm:mr-0'>
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

            {/* زر رفع الوثيقة */}
            <div className='mr-10 mt-10 grid justify-items-center translate-x-15 max-xl:translate-x-5 max-lg:mr-4 max-sm:translate-x-0 max-sm:mr-6'>
              <button 
                className={`w-50 h-14 bg-[#540C0F] text-white text-2xl rounded-2xl py-2 px-4 cursor-pointer transition-opacity hover:opacity-80 ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleSubmit}
                disabled={isUploading}
              >
                {isUploading ? 'جاري الرفع...' : 'رفع الوثيقة'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}