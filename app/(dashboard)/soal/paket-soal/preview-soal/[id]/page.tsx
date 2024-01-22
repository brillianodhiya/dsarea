"use client";

import CustomHeader from "@dsarea/@/components/layout/CustomeHeader";

import React from "react";

export default function AddSoal() {
  return (
    <div>
      <CustomHeader
        title="Preview Soal"
        isSubMenu
        subMenu={[
          {
            title: "Preview Soal (Sub Kategori)",
          },
        ]}
      />
    </div>
  );
}
