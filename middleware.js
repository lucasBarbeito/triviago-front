import { NextResponse } from 'next/server';

export function middleware(request) {
    // Get the JWT token from the request headers or cookies
    const token = request.cookies.get("jwt") ? request.cookies.get("jwt").value : undefined;

    const unprotectedRoutes = ['/login', '/singin'];
    const protectedRoutes = ['/home', '/quiz'];
    const pathToCheck = request.nextUrl.pathname;

    const isPathProtected = protectedRoutes.some(route => pathToCheck.startsWith(route));
    const isPathUnprotected = unprotectedRoutes.some(route => pathToCheck.startsWith(route));

    if (isPathProtected) {
        if (!token) {
            // If no token is found, redirect to the login page
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } else if (isPathUnprotected && token) {
        // If a token is found and the route is unprotected, redirect to the home page
        return NextResponse.redirect(new URL('/home', request.url));
    }
    // For routes that don't require authentication, no action is taken
    return null;
}