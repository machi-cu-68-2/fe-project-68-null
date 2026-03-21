"use client";

import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";

// 1. Interface โครงสร้างข้อมูล
interface Reservation {
  id: number;
  customerName: string;
  name: string;
  day: string;
  time: string;
  countpeople: string;
  status: "Pending" | "Confirmed";
}

// 2. ข้อมูลจำลอง (Mock Data) เพื่อให้เห็นหน้าเว็บก่อน
const mockData: Reservation[] = [
  {
    id: 1,
    customerName: "คุณสมชาย",
    name: "Restaurant THAI",
    day: "2026-03-31",
    time: "18:00",
    countpeople: "4",
    status: "Pending",
  },
  {
    id: 2,
    customerName: "คุณสมหญิง",
    name: "Restaurant CHINA",
    day: "2026-03-26",
    time: "19:30",
    countpeople: "2",
    status: "Confirmed",
  },
  {
    id: 3,
    customerName: "คุณจอห์น",
    name: "Restaurant LOS",
    day: "2026-04-15",
    time: "12:00",
    countpeople: "6",
    status: "Pending",
  },
];

// 3. นี่คือ React Component ที่ Next.js ต้องการ (ต้องมีคำว่า export default)
export default function AdminReservationsPage() {
  // ใส่ mockData เป็นค่าเริ่มต้นไปเลย จะได้โชว์บนหน้าเว็บทันที
  const [reservations, setReservations] = useState<Reservation[]>(mockData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ==========================================
  // TODO: ส่วนสำหรับเชื่อม Database ในอนาคต
  // ==========================================
  useEffect(() => {
    // TODO: เมื่อมี Database ค่อยมาเขียนโค้ดดึงข้อมูล (Fetch) ตรงนี้
    /*
    const fetchRealData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/admin/reservations");
        const data = await response.json();
        setReservations(data); // เอาข้อมูลจริงมาแทน mockData
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRealData();
    */
  }, []);

  const handleApprove = (id: number) => {
    // TODO: อนาคตต้องยิง API ไปอัปเดต Database ตรงนี้ก่อนค่อย setState
    if (window.confirm("ต้องการอนุมัติการจองนี้ใช่หรือไม่?")) {
      setReservations((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "Confirmed" } : item,
        ),
      );
    }
  };

  const handleDelete = (id: number) => {
    // TODO: อนาคตต้องยิง API ไปลบข้อมูลใน Database ตรงนี้ก่อนค่อย setState
    if (window.confirm("คุณแน่ใจหรือไม่ที่จะลบการจองนี้?")) {
      setReservations((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // ==========================================
  // UI Rendering (หน้าเว็บ)
  // ==========================================
  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#FEFAEC] flex justify-center items-center">
        <p className="text-xl font-bold text-gray-600">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FEFAEC] flex flex-col items-center">
      <div className="sticky top-0 w-full z-50">
        <NavBar />
      </div>

      <div className="mt-[5rem] w-full max-w-[1440px] flex flex-col px-4 md:px-[6.937rem] pt-[4rem] pb-20 box-border font-playfair-display">
        <div className="mb-8 flex justify-between items-end border-b-2 border-gray-200 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              จัดการการจองทั้งหมด ({reservations.length} รายการ)
            </p>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md w-full">
          <table className="min-w-full text-left border-collapse bg-[#FFF8DC]">
            <thead>
              <tr className="bg-[#CE7B11] border-b">
                <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">
                  รหัส
                </th>
                <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">
                  ชื่อลูกค้า
                </th>
                <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">
                  ร้านอาหาร
                </th>
                <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">
                  วัน/เวลา
                </th>
                <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">
                  จำนวน (คน)
                </th>
                <th className="p-4 font-semibold text-gray-700 whitespace-nowrap">
                  สถานะ
                </th>
                <th className="p-4 font-semibold text-gray-700 text-center whitespace-nowrap">
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody>
              {reservations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-gray-500">
                    ไม่มีข้อมูลการจองในระบบ
                  </td>
                </tr>
              ) : (
                reservations.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 text-gray-800">#{item.id}</td>
                    <td className="p-4 font-medium text-gray-900">
                      {item.customerName}
                    </td>
                    <td className="p-4 text-gray-800">{item.name}</td>
                    <td className="p-4 text-gray-600 whitespace-nowrap">
                      {item.day} <br />{" "}
                      <span className="text-sm text-gray-400">{item.time}</span>
                    </td>
                    <td className="p-4 text-gray-800 text-center">
                      {item.countpeople}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                          item.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2 justify-center">
                      {item.status !== "Confirmed" && (
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-sm transition"
                        >
                          อนุมัติ
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 text-sm transition"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
