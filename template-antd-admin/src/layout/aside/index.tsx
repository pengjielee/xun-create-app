import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import router from "@/router";

const menuItems = router
  .filter((item) => item.showInMenu)
  .map((item, index) => {
    return {
      key: String(index + 1),
      label: item.meta && item.meta.title,
      url: item.path,
    };
  });

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
};

const logoStyle = {
  height: 32,
  margin: 16,
  background: "rgba(255, 255, 255, 0.2)",
};

const Aside: React.FC = (props) => {
  const navigate = useNavigate();

  const handleMenuClick = (item) => {
    navigate(item.item.props.url);
  };

  return (
    <Layout.Sider
      onCollapse={(value) => props.onCollapse(value)}
      style={siderStyle}
      collapsible
      collapsed={props.collapsed}
    >
      <div style={logoStyle} />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </Layout.Sider>
  );
};

export default Aside;
