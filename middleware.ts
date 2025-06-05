import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const path = url.pathname;
    const token = req.cookies.get('token');
    const user = req.cookies.get('user')?.value;
    const role = user ? JSON.parse(user).role : null;
    const municipalityId = req.cookies.get('municipalityId')?.value;

    const authPaths = ['/login', '/login/admin', '/login/municipality', '/login/staff'];
    const isAdminPath = path.startsWith('/admin');
    const isMunicipalityPath = path.startsWith('/municipality');
    const isStaffPath = path.startsWith('/staff');
    const isAdminMunicipalityPath = path.startsWith('/adminmunicipality');
    const isAuthPath = authPaths.includes(path);

    // If user has a token (is authenticated)
    if (token) {
        // Special handling for adminmunicipality paths
        if (isAdminMunicipalityPath) {
            // Only admins with a valid municipalityId cookie can access these paths
            if (role !== 2) {
                return NextResponse.redirect(new URL("/", req.url));
            }

            // If admin but no municipalityId cookie, redirect to admin dashboard
            if (!municipalityId) {
                return NextResponse.redirect(new URL("/admin/dashboard", req.url));
            }

            return NextResponse.next();
        }

        // Redirect from login pages to appropriate dashboard based on role
        if (isAuthPath) {
            if (role === 2) {
                return NextResponse.redirect(new URL("/admin/dashboard", req.url));
            } else if (role === 3) {
                return NextResponse.redirect(new URL("/municipality/dashboard", req.url));
            } else if (role === 4) {
                return NextResponse.redirect(new URL("/staff/dashboard", req.url));
            }
        }

        // Redirect from root path to appropriate dashboard based on role
        if (path === '/') {
            if (role === 2) {
                return NextResponse.redirect(new URL("/admin/dashboard", req.url));
            } else if (role === 3) {
                return NextResponse.redirect(new URL("/municipality/dashboard", req.url));
            } else if (role === 4) {
                return NextResponse.redirect(new URL("/staff/dashboard", req.url));
            }
        }

        // Restrict access based on role
        if (isAdminPath && role !== 2) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        if (isMunicipalityPath && role !== 3) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        if (isStaffPath && role !== 4) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    }
    // If user has no token (not authenticated)
    else {
        if ((isAdminPath || isMunicipalityPath || isStaffPath || isAdminMunicipalityPath) && !isAuthPath) {
            if (isAdminPath || isAdminMunicipalityPath) {
                return NextResponse.redirect(new URL("/login/admin", req.url));
            } else if (isMunicipalityPath) {
                return NextResponse.redirect(new URL("/login/municipality", req.url));
            } else if (isStaffPath) {
                return NextResponse.redirect(new URL("/login/staff", req.url));
            }
        }

        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|static|favicon.ico|assets).*)',
    ],
};
