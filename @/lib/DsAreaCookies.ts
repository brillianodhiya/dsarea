" server";

import { cookies } from "next/headers";
import { getCookie, deleteCookie, setCookie, hasCookie } from "cookies-next";

export async function GetDsAreaCookie() {
  //   setCookie('test', 'value', { cookies });
  return getCookie("DS-X-Access-Agent-Token", { cookies });
  //   getCookies({ cookies });
  //   hasCookie('test', { cookies });
  //   deleteCookie('test', { cookies });
}

export async function DeleteDsAreaToken() {
  deleteCookie("DS-X-Access-Agent-Token", { cookies });
  return "ok";
}

export async function SetDsAreaToken(token: any) {
  setCookie("DS-X-Access-Agent-Token", token, {
    // ...cookies,
    maxAge: 30 * 24 * 60 * 60,
    // maxAge: 5 * 60,
    path: "/",
  });

  return "ok";
}

export async function HasDsAreaCookie() {
  return hasCookie("DS-X-Access-Agent-Token", { cookies });
}
