import React, { lazy } from "react";

export interface RouterBody {
  name?: string;
  path: string;
  component?: any;
  element?: any;
  children?: Array<RouterBody>;
}

const router: Array<RouterBody> = [
  {
    path: "/",
    component: lazy(() => import("@/views/home")),
    meta: {
      title: "首页",
    },
    showInMenu: true,
  },
  {
    path: "/about",
    component: lazy(() => import("@/views/about")),
    children: [
      {
        path: "/about1",
        component: lazy(() => import("@/views/about")),
        meta: {
          title: "about1",
        },
      },
      {
        path: "/about2",
        component: lazy(() => import("@/views/about")),
        meta: {
          title: "about2",
        },
      },
    ],
    meta: {
      title: "关于",
    },
    showInMenu: true,
  },
  {
    path: "/list",
    component: lazy(() => import("@/views/list")),
    meta: {
      title: "列表",
    },
    showInMenu: true,
  },
  {
    path: "/topic/list",
    component: lazy(() => import("@/views/topic/list")),
    meta: {
      title: "话题列表",
    },
    showInMenu: true,
  },
  {
    path: "/topic/detail/:id",
    component: lazy(() => import("@/views/topic/detail")),
    meta: {
      title: "话题详情",
    },
    showInMenu: false,
  },
  {
    path: "*",
    component: lazy(() => import("@/views/404")),
    showInMenu: false,
  },
];

export default router;
