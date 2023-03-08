import React, { useState } from "react";
import { Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const style = {
  padding: "0 15px",
  background: "#fff",
};

const Header: React.FC = (props) => {
  return (
    <Layout.Header style={style}>
      {React.createElement(
        props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "trigger",
          onClick: () => props.onCollapse(!props.collapsed),
        }
      )}
    </Layout.Header>
  );
};

export default Header;
