import React, { useState, Suspense } from "react";
import { Layout, Breadcrumb } from "antd";
import { useRoutes } from "react-router-dom";
import router from "@/router";

const changeRouter = (routers: Array<RouterBody>): any => {
  return routers.map((item) => {
    if (item.children) {
      item.children = changeRouter(item.children);
    }
    item.element = (
      <Suspense fallback={<div>加载中...</div>}>
        {/* 把懒加载的异步路由变成组件装载进去 */}
        <item.component />
      </Suspense>
    );
    return item;
  });
};
const Router = () => useRoutes(changeRouter(router));

const Content: React.FC = (props) => {
  return (
    <Layout.Content
      style={{
        margin: "20px 16px",
        overflow: "initial",
        minHeight: "90vh",
        background: "#fff",
      }}
    >
      <Breadcrumb
        style={{ margin: "16px 0", display: "none" }}
        items={[{ title: "Home" }]}
      />

      <div
        style={{
          padding: "30px 20px",
        }}
      >
        <Router />
      </div>
    </Layout.Content>
  );
};

export default Content;
