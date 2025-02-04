import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  GetDsAreaRoleCookie,
  HasDsAreaCookie,
} from "@dsarea/@/lib/DsAreaCookies";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dsarea | Masuk",
  description: "Masuk untuk melanjutkan",
};

export default async function Home() {
  const hasCookie = await HasDsAreaCookie();
  const roleId = await GetDsAreaRoleCookie();

  if (hasCookie) {
    if (roleId == "3") {
      redirect("/siswa/dashboard");
    } else {
      redirect("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#5acacc]">
      <div className="max-w-md w-full space-y-8">
        <div className="z-50 card shadow-xl rounded-xl p-10 bg-white">
          <Image
            width={400}
            height={400}
            className="m-auto h-32 w-auto"
            src="/DSAREA.png"
            alt="Dsarea Logo"
          />
          <h2 className="text-lg text-[#3b969a] font-semibold">
            Maksimalkan kualitas belajarmu bersama kami!
          </h2>
          <Link
            className="bg-[#0e4647] text-white flex flex-row items-center justify-center gap-2 py-4 rounded-2xl mt-2 font-semibold text-base"
            href={process.env.URL_BE + "/api/auth/google"}
          >
            <Image
              alt="Google Signin"
              width={20}
              height={20}
              src={"/icons8-google.svg"}
            />
            Sign in With Google
          </Link>
        </div>
      </div>
    </div>
  );
}
// http://localhost:3000/auth-success?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZV9pZCI6MSwidXNlcl9pZCI6IjEwMzYxNTgyMDA3NjMzMjM4MDk5MyIsImVtYWlsIjoiZGlhbmNhbmRyYTExMkBnbWFpbC5jb20iLCJuYW1lIjoiRElBTiIsImlhdCI6MTcwNDc2ODQ0OSwiZXhwIjoxNzA0NzcyMDQ5fQ._QxiwouOzlfi15vhxIL2QyPdoO1M1JEVigQiM6mYmK8&role_id=3
// http://localhost:3000/auth-success?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZV9pZCI6MSwidXNlcl9pZCI6IjEwMDU3NDMyOTAwNDQ4NzI4MDQ2MyIsImVtYWlsIjoiYnJpbGxpZGhpeWFAZ21haWwuY29tIiwibmFtZSI6IkJyaWxsaWFubyBEaGl5YSBVbGhhcSIsImlhdCI6MTcwNDk5NjgzOSwiZXhwIjoxNzM2MTAwODM5fQ.JPWvVftUAB19t2i-8SG7EzIQmg9iFlWeU_ELauPRbH0&role_id=1
// http://localhost:3000/auth-success?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInJvbGVfaWQiOjMsInVzZXJfaWQiOiIxMTQ2MDE4NjE4MjM4NDM5MDg1NzQiLCJlbWFpbCI6ImFpdGlsb2thbEBnbWFpbC5jb20iLCJuYW1lIjoiQWl0aSIsImlhdCI6MTcwNjU4MTg0NCwiZXhwIjoxNzM3Njg1ODQ0fQ.ifbeJKr-vv9VNHpKY0SyVpVzceZw_yPNh1PLqFGw9tg&role_id=3
