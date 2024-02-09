"use client";
import { Carousel } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface BannerType {
  data: any;
}

export const BannerCarousel: React.FC<BannerType> = ({ data }) => {
  return (
    <Carousel
      autoplay
      style={{
        backgroundColor: "#3a9699",
        borderRadius: 8,
        height: "calc(16vw + 10vh)",
      }}
      dots={{
        className: "bg-red-500 p-2 rounded-full text-red-500",
      }}
    >
      {data.map((e: any, i: number) => (
        <Link href={e.link ? e.link : ""} target="_blank" key={i.toString()}>
          <div
            key={i}
            className=" h-[240px]  bg-red-500"
            style={{
              width: "100%",
              height: "calc(16vw + 10vh)",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <Image
              alt={e.title + i}
              src={e.image}
              width={1000}
              height={1000}
              style={{
                objectFit: "contain",
                objectPosition: "center",
                borderRadius: 8,
                height: "calc(16vw + 10vh)",
                width: "100%",
                position: "relative",
              }}
            />
          </div>
        </Link>
      ))}
    </Carousel>
  );
};
