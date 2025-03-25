import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Sidebar_Employee from "../Sidebar/Sidebar_Employee";

export default function Employee_Home() {
  const [open, setOpen] = useState(window.innerWidth > 640);
  const chartsRef = useRef([]);
  const chartInstances = useRef([]); // تخزين الكائنات لإنهائها عند إعادة الإنشاء

  const chartData = [
    { title: "التسليمات المعلقة", percentage: 55, color: "#8B171C" },
    { title: "المتطلبات التي تم تسليمها", percentage: 95, color: "#8B171C" },
    { title: "التسليمات المرفوضة", percentage: 30, color: "#8B171C" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 640);
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
              backgroundColor: [data.color, "#ddd"],
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
        <div className="employee-page w-full flex justify-between">
          {/*  الشريط الجانبي */}
          <Sidebar_Employee open={open} setOpen={setOpen} />

          {/*  الصفحة الرئيسية */}
          <div className={`employee-home ${open ? "mr-90 max-lg:mr-76" : "mr-20 max-lg:mr-16"} duration-200 flex-1 justify-items-center`}>
            {/* خانة البحث */}
            <div className="search-bar mt-6 relative">
              <i className="fa-solid fa-magnifying-glass absolute top-5 ps-3 pointer-events-none" />
              <i className="fa-solid fa-bars absolute top-5 left-6 cursor-pointer" />
              <input type="text" className="w-90 h-14 p-2 ps-10 text-sm bg-indigo-100 outline-0 rounded-4xl max-lg:w-70" placeholder="ابحث" />
            </div>

            {/*  محتوى الصفحة الرئيسية */}
            <div className="employee-home-content w-full grid grid-cols-1">
              {/*  التسليمات */}
              <div  className="deliverables flex justify-evenly gap-y-10 flex-wrap text-[#8B171C] text-center mt-16 text-xl duration-300">
                {chartData.map((item, index) => (
                  <div key={index}  className="w-70 h-74 bg-[#CCCCCC] text-[#540C0F] grid grid-cols-1 justify-items-center border rounded-2xl max-sm:w-64 max-sm:h-66">
                    <h1 className="mt-4">{item.title}</h1>
                    <canvas ref={(el) => (chartsRef.current[index] = el)} className="w-28 h-28 mt-2">
                      
                    </canvas>
                    <button style={{ backgroundColor: "var(--primary-color)" }} className="text-white text-base w-36 h-12 rounded-lg cursor-pointer transition-opacity hover:opacity-80">
                      مراجعة التسليمات
                    </button>
                  </div>
                ))}
              </div>

              {/*  عنوان الكليات */}
              <div className="title relative mt-20">
                <h1  className="text-3xl text-[#540C0F] text-center block">
                  الكليات
                </h1>
              </div>

              {/*  قائمة الكليات */}
              <div className="colleges title text-white text-center mt-20 text-2xl duration-300">
                {[
                  "كلية الطب", "كلية تكنولوجيا المعلومات", "كلية الهندسة",
                   "كلية الاعمال","كلية الاداب","كلية الشريعة",
                    "كلية العلوم","كلية الصيدلة","كلية الرياضة","كلية العلوم التربوية",
                    "كلية التمريض","كلية طب الاسنان",].map((college, index) => (
                  <div key={index}  className="w-46 h-46 bg-[#611013] relative rounded-2xl cursor-pointer hover:scale-105 duration-300">
                    <h2 className="centerd">{college}</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
