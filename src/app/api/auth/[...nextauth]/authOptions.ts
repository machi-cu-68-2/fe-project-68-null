import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userSignIn from "@/lib/userSignIn";

export const authOptions: AuthOptions = {
  // 1. กำหนด Providers (ช่องทางการ Login)
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      // ทำงานเมื่อผู้ใช้กดปุ่ม Sign in
      async authorize(credentials, req) {
        if (!credentials) return null;

        // เรียกฟังก์ชันของคุณเพื่อไปเช็คใน Database
        const user = await userSignIn(credentials.email, credentials.password);

        if (user) {
          return user; // ถ้าเจอ user และรหัสถูก ให้ส่ง user กลับไป (จะไปเข้า JWT ต่อ)
        } else {
          return null; // ถ้าไม่เจอ หรือรหัสผิด ส่ง null (จะแสดง Error หน้าเว็บ)
        }
      },
    }),
  ], // <-- ปิด Array ของ providers ตรงนี้

  // 2. Callbacks (ต้องอยู่ระดับเดียวกับ providers)
  callbacks: {
    // ทำงานหลังจาก authorize สำเร็จ เพื่อสร้าง Token
    async jwt({ token, user }) {
      // ถ้ามี user ส่งมา (ตอน login ครั้งแรก) ให้เอาข้อมูล user ไปรวมกับ token
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    // ทำงานทุกครั้งที่ฝั่ง Client หรือ Server เรียกใช้ Session
    async session({ session, token }) {
      // เอาข้อมูลจาก token มาใส่ใน session.user เพื่อให้ Frontend เอาไปใช้ได้
      session.user = token as any;
      return session;
    },
  },

  // 3. กำหนดรูปแบบ Session
  session: {
    strategy: "jwt",
  },
};
