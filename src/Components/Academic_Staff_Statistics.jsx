import React from 'react'
import { useState,useEffect,useRef } from 'react'
import Chart from "chart.js/auto";
import Sidebar_Academic_Staff from '../Sidebar/Sidebar_Academic_Staff';


export default function Academic_Staff_Statistics() {

    const [open, setOpen] = useState(window.innerWidth > 640); // مغلق  على الشاشات الصغيرة
    const chartsRef = useRef([]);
    const chartInstances = useRef([]); // تخزين الكائنات لإنهائها عند إعادة الإنشاء
  
    const chartData = [
      { title: "التسليمات المعلقة", percentage: 55, color: "#8B171C" },
      { title: "المتطلبات التي تم تسليمها", percentage: 95, color: "#8B171C" },
      { title: "التسليمات المرفوضة", percentage: 30, color: "#8B171C" },
      { title: "التسليمات المقبولة", percentage: 70, color: "#8B171C" },
    ];
  
        
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 640) {
          setOpen(false);   
        } else {
          setOpen(true);    
        }
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []); 

   useEffect(() => {
    chartData.forEach((data, index) => {
      let ctx = chartsRef.current[index].getContext("2d");
  
      //  إزالة المخطط السابق قبل إنشاء الجديد
      if (chartInstances.current[index]) {
        chartInstances.current[index].destroy();
      }
  
      let currentValue = { value: 0 };
      let animationSpeed = 15;
  
      const chartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [0, 100],
              backgroundColor: [data.color, "#F9DADC"],
              borderWidth: 0, 
            },
          ],
        },
        options: {
          responsive: true,
          cutout: "80%", //  تصغير سمك الدائرة
          plugins: {
            tooltip: { enabled: false },
            legend: { display: false }, 
          },
          animation: {
            onComplete: function () {
              const chart = chartInstance;
              const ctx = chart.ctx;
              const { width, height } = chart;
              ctx.restore();
              const fontSize = (height / 8).toFixed(2);
              ctx.font = `${fontSize}px Arial`;
              ctx.textBaseline = "middle";
              ctx.textAlign = "center";
              const text = `${data.percentage}%`;
              const x = width / 2;
              const y = height / 2;
              ctx.fillStyle = "#822125"; // لون النص 
              ctx.fillText(text, x, y);
              ctx.save();
            },
          },
        },
      });
  
      chartInstances.current[index] = chartInstance; // حفظ المرجع
  
      const animateChart = () => {
        if (currentValue.value < data.percentage) {
          currentValue.value++;
          chartInstance.data.datasets[0].data = [currentValue.value, 100 - currentValue.value];
          chartInstance.update();
          setTimeout(animateChart, animationSpeed);
        }
      };
  
      animateChart();
    });
  
    //  تنظيف المخططات عند تفكيك المكون
    return () => {
      chartInstances.current.forEach((instance) => instance?.destroy());
    };
  }, []);
  

  return (
    <>
    <section>
    <div className="academic-staff-page w-full flex justify-between">

         {/*  side bar */}
       
        <Sidebar_Academic_Staff open={open} setOpen={setOpen}/>

         {/*  الصفحة الرئيسية */}
        <div className={`academic-staff-statistics ${open ? 'mr-90 max-lg:mr-76' : 'mr-20 max-lg:mr-16'}  duration-200 flex-1 justify-items-center`}>
  
         {/*  محتوى الصفحة الرئيسية  */}
        <div className=" mb-10  w-full grid grid-col-1  ">
          
          <h1 className='text-4xl text-center text-[#540C0F] font-bold mt-6'>الإحصائيات</h1>
        {/*  التسليمات */}
        <div  className="deliverables grid grid-cols-2 max-lg:grid-cols-1 justify-items-center gap-y-10  text-[#8B171C] text-center mt-16 text-xl duration-300">
          {chartData.map((item, index) => (
            <div key={index}  className="w-70 h-74 bg-gray-100 grid grid-cols-1 justify-items-center border rounded-2xl max-sm:w-64 max-sm:h-66">
              <h1 className="mt-4">{item.title}</h1>
              <canvas ref={(el) => (chartsRef.current[index] = el)} className="w-28 h-28 mt-2"></canvas>
              <button style={{ backgroundColor: "var(--primary-color)" }} className="text-white text-base w-36 h-12 rounded-lg cursor-pointer transition-opacity hover:opacity-80">
                مراجعة التسليمات
             </button>
            </div>
                ))}
        </div>

        <div className='flex justify-center mt-15'>
        <button className='w-50 h-18 bg-[#540C0F] text-white text-xl rounded-3xl p-2 cursor-pointer transition-opacity hover:opacity-80'>
        تصدير التسليمات كملف Excel
        </button>
        </div>


        </div>
        </div>
        </div>
        </section>
    </>
  )
}
