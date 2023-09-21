import { NextResponse } from 'next/server';

export function middleware(request) {
    // Get the JWT token from the request headers or cookies
    const token = request.cookies.get("jwt") ? request.cookies.get("jwt").value : undefined;


    // Define the routes that should be protected
    const protectedRoutes = ['/home', '/profile', '/quiz']; // Add your protected routes here
    // const unprotectedRoutes = ['/login', '/signin']; // Add your unprotected routes here

    // Check if the current route is in the list of protected routes
    if (protectedRoutes.includes(request.nextUrl.pathname)) {
        if (!token) {
            // If no token is found, redirect to the login page
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // For routes that don't require authentication, no action is taken
    return null;
}