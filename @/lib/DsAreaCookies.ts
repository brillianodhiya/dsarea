"use server";

import { cookies } from "next/headers";
import { getCookie, deleteCookie, setCookie, hasCookie } from "cookies-next";

export async function GetDsAreaCookie() {
  return getCookie("DS-X-Access-Agent-Token", { cookies });
}

export async function DeleteDsAreaToken() {
  cookies().delete("DS-X-Access-Agent-Token");
  // deleteCookie("DS-X-Access-Agent-Token", { cookies });
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
