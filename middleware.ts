export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile", "/my-reservations", "/users/:path*"],
};
