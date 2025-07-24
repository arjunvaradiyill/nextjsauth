import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // This function is called for each request
    console.log("Middleware: User is authenticated");
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
}; 