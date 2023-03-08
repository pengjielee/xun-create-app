import React, { useEffect, useState } from "react";
import { Space, Table, message, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getTopics } from "@/api/cnode";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface DataType {
  id: string;
  title: string;
  visit_count: number;
  author: string;
  tab: string;
  create_at: string;
  last_reply_at: string;
}

const PAGE_SIZE = 10;

const Page: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const navigate = useNavigate();
  const [current, setCurrent] = useState<number>(1);

  const columns: ColumnsType<DataType> = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      width: 340,
      render: (text, record) => (
        <a onClick={() => navigate(`/topic/detail/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: "作者",
      key: "author",
      render: (record) => <>{record.author.loginname}</>,
    },
    {
      title: "类别",
      dataIndex: "tab",
      key: "tab",
    },
    {
      title: "访问数",
      dataIndex: "visit_count",
      key: "visit_count",
    },
    {
      title: "创建时间",
      dataIndex: "create_at",
      key: "create_at",
      render: (text) => <>{dayjs(text).format("YYYY-MM-DD HH:mm:ss")}</>,
    },
    {
      title: "最后回复时间",
      dataIndex: "last_reply_at",
      key: "last_reply_at",
      render: (text) => <>{dayjs(text).format("YYYY-MM-DD HH:mm:ss")}</>,
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            className="action"
            onClick={() => navigate(`/topic/detail/${record.id}`)}
          >
            详情
          </a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    getTopics({ page: current, limit: PAGE_SIZE })
      .then((res) => {
        if (res.success) {
          setDataSource(res.data);
        } else {
          message.error("获取列表失败");
        }
      })
      .finally(() => setLoading(false));
  }, [current]);

  return loading ? (
    <Spin size="large" />
  ) : (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={{
        current: current,
        pageSize: PAGE_SIZE,
        showQuickJumper: false,
        showSizeChanger: false,
        total: 1000,
      }}
      onChange={(pagination) => setCurrent(pagination.current)}
    />
  );
};

export default Page;
