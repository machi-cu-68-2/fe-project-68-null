"use client"; // จำเป็นต้องใส่เพราะเราใช้ useState

import Link from "next/link";
import { useState } from "react";

export default function CardButton() {
  // สร้าง State ควบคุมการเปิด/ปิด ป๊อปอัพ
  const [showPopup, setShowPopup] = useState(false);

  // ฟังก์ชันเมื่อกดยืนยันการยกเลิก
  const handleConfirmCancel = () => {
    console.log("ยกเลิกการจองเรียบร้อย!");
    // ... ใส่โค้ดยกเลิกการจองตรงนี้ ...
    setShowPopup(false); // ปิดป๊อปอัพ
    // หรืออาจจะย้ายหน้าไปหน้าอื่น เช่น: router.push('/reservations/canceled');
  };
  return (
    <>
      <div className="absolute top-[14.563rem] left-[2.125rem] w-[18rem] h-[2.75rem] flex items-start gap-[0.75rem] text-center">
        {/* ปุ่ม 1: View Restaurant (เหมือนเดิม) */}
        <Link href="/" className="flex-1 h-[2.75rem] block">
          <div className="h-full w-full shadow-[0px_4px_6px_rgba(0,_0,_0,_0.1)] rounded-full bg-[#e8a118] flex items-center justify-center font-semibold text-white hover:bg-[#ce7b11] transition-colors">
            View Restaurant
          </div>
        </Link>

        {/* ปุ่ม 2: Cancel (เปลี่ยนจาก <Link> เป็น <button> เพื่อให้คลิกแล้วเปิดป๊อปอัพ สีและขนาดเดิมเป๊ะ) */}
        <button
          onClick={() => setShowPopup(true)}
          className="w-[6.369rem] h-[2.75rem] block p-0 bg-transparent border-none cursor-pointer"
        >
          <div className="h-full w-full rounded-full border-[#ce7b11] border-solid border-[2px] box-border text-[#ce7b11] flex items-center justify-center font-semibold hover:bg-[#ce7b11] hover:text-white transition-colors">
            Cancel
          </div>
        </button>
      </div>

      {/* ส่วนป๊อปอัพ (แสดงเมื่อโชว์ showPopup เป็น true) */}
      {showPopup && (
        // z-[9999] เพื่อให้อยู่หน้าสุดของทุกอย่าง
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          {/* กล่องเนื้อหา ป๊อปอัพ พร้อมอนิเมชั่น fade-in */}
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center transform transition-all animate-fade-in font-inter">
            <h3 className="text-2xl font-playfair-display text-[#724a15] font-bold mb-4">
              Cancel Reservation?
            </h3>
            <p className="text-gray-600 mb-8">
              Are you sure you want to cancel this reservation? This action
              cannot be undone.
            </p>

            <div className="flex justify-center gap-4">
              {/* ปุ่ม: No, Keep it - เพิ่มลูกเล่นใหม่ (Scale/Fill color/Shadow) 👇 */}
              <button
                onClick={() => setShowPopup(false)}
                className="px-6 py-2 rounded-full font-bold transition-all duration-300 ease-out
                           text-[#ce7b11] border-[2px] border-[#ce7b11] 
                           hover:bg-[#ce7b11] hover:text-white hover:scale-105 hover:shadow-lg"
              >
                No, Keep it
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-6 py-2 rounded-full font-bold transition-all duration-300 ease-out
                           text-red-500 border-[2px] border-red-500 bg-transparent
                           hover:bg-red-500 hover:text-white hover:scale-105 hover:shadow-lg"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </> //TODO ถ้ากดปุ่ม Yes, Cancel ให้ลบข้อมูล reservation
  );
}
