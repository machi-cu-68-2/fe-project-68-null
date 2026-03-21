"use client";

import React from "react";
import ReservationHeader from "@/components/ReservationHeader";
import CardReservations from "@/components/CardReservations";
import NavBar from "@/components/NavBar";

// 1. กำหนด Interface สำหรับข้อมูลการจองของ User
interface UserReservation {
  id: number;
  name: string;
  day: string;
  time: string;
  countpeople: string;
}

// 2. ข้อมูลจำลอง (Mock Data)
const reservationData: UserReservation[] = [
  {
    id: 1,
    name: "Restaurant THAI",
    day: "2026-03-31",
    time: "18:00",
    countpeople: "4",
  },
  {
    id: 2,
    name: "Restaurant CHINA",
    day: "2026-03-26",
    time: "19:30",
    countpeople: "4",
  },
  {
    id: 3,
    name: "Restaurant LOS",
    day: "2026-04-15",
    time: "12:00",
    countpeople: "4",
  },
  {
    id: 4,
    name: "Restaurant LOS",
    day: "2026-12-15",
    time: "12:00",
    countpeople: "4",
  },
  {
    id: 5,
    name: "Restaurant LOS",
    day: "2030-04-15",
    time: "12:00",
    countpeople: "4",
  },
];

export default function MyReservationsPage() {
  return (
    // สังเกตว่าผมใช้สี #FEFAEC ตามที่คุณเคยเขียนไว้ เพื่อแยกความต่างจากฝั่ง Admin (#FFF8DC)
    <div className="w-full flex flex-col items-center">
      {/* แถบนำทางด้านบน */}
      <div className="sticky top-0 w-full z-50">
        <NavBar />
      </div>

      {/* พื้นที่เนื้อหาหลัก */}
      <div className="w-full max-w-[1440px] flex flex-col px-4 md:px-[6.937rem] pt-[4rem] pb-20 box-border font-playfair-display">
        {/* Header แสดงจำนวนการจอง */}
        <ReservationHeader count={reservationData.length} />

        {/* Layout แบบ Grid สำหรับแสดงการ์ด (responsive) */}
        {reservationData.length === 0 ? (
          <div className="w-full flex justify-center items-center mt-20">
            <p className="text-xl text-gray-500">คุณยังไม่มีการจองในขณะนี้</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-12 mt-8 w-full justify-items-center">
            {/* วนลูปสร้างการ์ด */}
            {reservationData.map((item) => (
              <CardReservations
                key={item.id}
                name={item.name}
                day={item.day}
                time={item.time}
                countpeople={item.countpeople}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
