"use client";
import { Dropdown, DropdownProps, MenuProps } from "antd/lib";
// import { Dropdown, DropdownProps, MenuProps } from "antd";
import { Eye, MoreVertical, PencilLine } from "lucide-react";
import React, { useState } from "react";

const DropdownMenuAction = ({
  onClick = (_ev: any) => {},
  itemLists = [
    {
      label: "View",
      key: "1",
      icon: <Eye size={17} />,
    },
    {
      label: "Edit",
      key: "2",
      icon: <PencilLine size={17} />,
    },
  ],
}) => {
  const [open, setOpen] = useState(false);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    onClick(e);
  };

  const handleOpenChange: DropdownProps["onOpenChange"] = (nextOpen, info) => {
    if (info.source === "trigger" || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const items: MenuProps["items"] = itemLists;

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
        <MoreVertical color="#000" size={17} />
      </a>
    </Dropdown>
  );
};

export default DropdownMenuAction;
