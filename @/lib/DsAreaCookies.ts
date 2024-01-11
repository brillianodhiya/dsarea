"use server";

import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

export async function getDsAreaCookie() {
  //   setCookie('test', 'value', { cookies });
  return getCookie("DS-X-Access-Agent-Token", { cookies });
  //   getCookies({ cookies });
  //   hasCookie('test', { cookies });
  //   deleteCookie('test', { cookies });
}
