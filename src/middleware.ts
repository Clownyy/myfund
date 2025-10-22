import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/sys-menu/:path*", 
    "/invoice/:path*", 
    "/instrument/:path*", 
    "/transaction/:path*",
    "/saving/:path*",
    "/profile/:path*",
  ],
};
