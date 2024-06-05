import { NextRequest, NextResponse } from "next/server"

import { createClient } from "@/utils/supabase"

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - login (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - .(svg|png|jpg|jpeg|gif|webp) (image files)
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}

export async function middleware(request: NextRequest) {
    const response = NextResponse.next()
    const requestPath = request.nextUrl.pathname
    const supabase = createClient()
    const { data: session } = await supabase.auth.getSession()
    if (
        session?.session === null &&
        !requestPath.startsWith("/home") &&
        !requestPath.startsWith("/auth") &&
        !requestPath.startsWith("/api/auth") &&
        !requestPath.startsWith("/tos") &&
        !requestPath.startsWith("/privacy-policy")
    ) {
        // Redirect to /home if not logged in and not on /home or /auth
        const requestUrl = new URL(request.url)
        return NextResponse.redirect(requestUrl.origin + "/home")
    }
    return response
}
