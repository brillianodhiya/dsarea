"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";
import { useEffect } from "react";
import Image from "next/image";

const getData = () => {};

export default function AuthSuccess() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  // mengatur cookie dengan token, masa kadaluwarsa 1 bulan, dan jalur '/'
  setCookie("DS-X-Access-Agent-Token", token, {
    maxAge: 30 * 24 * 60 * 60,
    // maxAge: 5 * 60,
    path: "/",
  });

  //   mengalihkan ke halaman /dashboard setelah 5 detik
  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-24">
      <Image src={"/DSAREA.png"} width={150} height={150} alt="Dsarea Logo" />
      <h1 className="text-3xl font-bold">Success Logged In</h1>
      <p className="text-xl">Kamu akan di alikhan otomatis...</p>
    </main>
  );
}
