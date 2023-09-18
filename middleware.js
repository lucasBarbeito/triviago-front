import { NextResponse } from 'next/server';

export function middleware(request) {
    // Get the JWT token from the request headers or cookies
    const token = request.cookies.get("jwt") ? request.cookies.get("jwt").value : undefined;

    const unprotectedRoutes = ['/login', '/signin']; // Add your unprotected routes here

    if (unprotectedRoutes.includes(request.nextUrl.pathname)) {
        if (token) {
            // If a token is found, redirect to the home page
            return NextResponse.redirect(new URL('/home', request.url));
        }
    }

    if (!unprotectedRoutes.includes(request.nextUrl.pathname)) {
        if (!token) {
            // If no token is found, redirect to the login page
            window.location.reload(true);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // For routes that don't require authentication, no action is taken
    return null;
}