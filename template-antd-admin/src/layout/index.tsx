import React, { useState } from "react";
import { Layout } from "antd";

import Aside from "@/layout/aside";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import Content from "@/layout/content";

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider>
      <Aside collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout
        className="site-layout"
        style={{ marginLeft: collapsed ? 70 : 200 }}
      >
        <Header collapsed={collapsed} onCollapse={setCollapsed} />

        <Content />
        <Footer />
      </Layout>
    </Layout>
  );
};

export default App;
