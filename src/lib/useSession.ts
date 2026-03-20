// TODO: แทนที่ด้วย session จริงเมื่อทำระบบ Auth (NextAuth / Supabase / Clerk)
// เปลี่ยน false → true เพื่อจำลองว่า login แล้ว

export function useSession() {
  const session = false;
  return { session, isLoggedIn: !!session };
}
