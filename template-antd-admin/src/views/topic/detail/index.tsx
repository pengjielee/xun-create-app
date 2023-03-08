import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { message, Spin } from "antd";
import { getTopicById } from "@/api/cnode";
import "./style.css";

interface TopicDetail {
  id: string;
  title: string;
  content: string;
  visit_count: number;
  author: string;
  tab: string;
  create_at: string;
  last_reply_at: string;
}

const Page: React.FC = () => {
  let { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [detail, setDetail] = useState<TopicDetail>(null);

  useEffect(() => {
    if (!id) {
      message.error("参数错误");
      return;
    }
    setLoading(true);
    getTopicById(id)
      .then((res) => {
        if (res.success) {
          setDetail(res.data);
        } else {
          message.error("获取话题详情出错");
        }
      })
      .finally(() => setLoading(false));
  }, [id]);
  return loading ? (
    <Spin />
  ) : (
    <div className="page-topic-detail">
      <h1 className="title">{detail && detail.title}</h1>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: detail && detail.content }}
      ></div>
    </div>
  );
};

export default Page;
