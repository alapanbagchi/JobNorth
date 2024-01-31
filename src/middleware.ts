import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const PREVENT_ACCESSS_IF_AUTHENTICATED = [
    "/signup",
    "/login",
]

const PREVENT_ACCESSS_IF_NOT_AUTHENTICATED = [
    "/hospitals",
]

export default auth((req) => {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-url', req.url);
    const isPrevented = PREVENT_ACCESSS_IF_AUTHENTICATED.some((path) => req.url.startsWith(path))
    if (isPrevented && req.auth?.user) {
        return NextResponse.next({
            request: {
                headers: requestHeaders
            },
            status: 302,
            redirect: "/"
        });
    }
    const isPrevented2 = PREVENT_ACCESSS_IF_NOT_AUTHENTICATED.some((path) => req.url.startsWith(path))
    if (isPrevented2 && !req.auth?.user) {
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
            status: 302,
            redirect: "/login"
        });
    }
    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}