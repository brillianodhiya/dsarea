"use client";
import { Carousel } from "antd";
import Image from "next/image";
import React from "react";
interface BannerType {
  data: any;
  loading: boolean;
}

export const BannerCarousel: React.FC<BannerType> = ({ data, loading }) => {
  return (
    <Carousel
      autoplay
      style={{
        backgroundColor: "#3a9699",
        borderRadius: 8,
        height: 280,
      }}
      dots={{
        className: "bg-red-500 p-2 rounded-full text-red-500",
      }}
    >
      {data.map((e: any, i: any) => (
        <div
          key={i}
          className=" h-[240px]  bg-red-500"
          style={{
            width: "100%",
            height: "282px",
            position: "relative",
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
              height: "280px",
              width: "100%",
              position: "relative",
            }}
          />
        </div>
      ))}
    </Carousel>
  );
};
