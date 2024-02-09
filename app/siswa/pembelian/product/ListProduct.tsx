"use client";
import { Col, Grid, Input, Layout, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProfileContext } from "@dsarea/@/lib/ProfileContext";
import { ProductCard } from "@dsarea/@/components/pembelian/ProductCard";
import { SearchOutlined } from "@ant-design/icons";
import { searchFromValue } from "@dsarea/@/lib/SearchFromValue";

type HeaderProps = {
  data: {
    id: number;
    having_expired: boolean;
    status: string;
    start_date: string;
    end_date: string;
    nama_product: string;
    harga: number;
    desc: string;
    benefit: string;
    image: string;
    is_publish: boolean;
    publish_date: any;
    createdAt: string;
    updatedAt: string;
    total_soal: number;
    total_pembelian: number;
    is_buying: boolean;
    category: {
      id: number;
      product_id: number;
      name: string;
      desc: string;
      createdAt: string;
      updatedAt: string;
    }[];
  }[];
};

const { useBreakpoint } = Grid;

const ListProduct: React.FC<HeaderProps> = ({ data }) => {
  const [searchText, setSearchText] = React.useState("");

  return (
    <>
      <Input
        placeholder="Search anything..."
        suffix={<SearchOutlined />}
        className="!w-[calc(100%-30px)]"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="w-full flex justify-center max-h-[86vh] overflow-y-scroll overflow-x-hidden">
        <Row gutter={[24, 24]} className="mt-4" justify={"start"}>
          {searchFromValue(data, searchText).map((e: any, i) => (
            <Col key={i}>
              <ProductCard {...e} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default ListProduct;
