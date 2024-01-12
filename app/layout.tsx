import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ConfigProvider from "antd/lib/config-provider";
import { QueryClient } from "@tanstack/react-query";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Dsarea",
  description: "Tryout application",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              cssVar: true,
              token: {
                // Seed Token
                colorPrimary: "#3A9699",
                // borderRadius: 2,

                // Alias Token
                // colorBgContainer: '#f6ffed',
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
