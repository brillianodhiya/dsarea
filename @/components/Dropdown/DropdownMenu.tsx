"use client";
import { Dropdown, DropdownProps, MenuProps } from "antd";
import { Eye, MoreVertical, PencilLine } from "lucide-react";
import React, { useState } from "react";

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log(e);
  };

  const handleOpenChange: DropdownProps["onOpenChange"] = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "View",
      key: "1",
      icon: <Eye />,
    },
    {
      label: "Edit",
      key: "2",
      icon: <PencilLine />,
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      onOpenChange={handleOpenChange}
      open={open}
    >
      <a onClick={(e) => e.preventDefault()}>
        <MoreVertical color="#000" />
      </a>
    </Dropdown>
  );
};

export default DropdownMenu;
