// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/blogs", "/contact", "/profile"] };

import { NextResponse } from "next/server";
export const middleware = (request) => {
  const pathname = request.nextUrl.pathname;
  const isLogin = request.cookies.get("isLogin");
  const page = request.cookies.get("page");
  const currentLogin = request.cookies.get("currentLogin");

  if (isLogin?.value === "login" && pathname === "/auth") {
    const urlLogin = `${request.nextUrl.origin}/${page?.value}`;
    return NextResponse.redirect(urlLogin);
  }
  const response = NextResponse.next();
  // if (currentLogin === "github") {
  //   // response.cookies.set({
  //   //   name: "githubLogged",
  //   //   value: "logged",
  //   // });
  //   response.headers.set("x-api-key", "provider=github");
  // }
  // if (currentLogin === "google") {
  //   // response.cookies.set({
  //   //   name: "googleLogged",
  //   //   value: "logged",
  //   // });
  //   response.headers.set("x-api-key", "provider=google");
  // }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
