// category：{1：菜单，2：路由}
// requestPath: 请求路由
// componentPath: 页面路由

export const routerList = [
  {
    name: '办公',
    icon: 'Grid',
    category: '1',
    children: [
      {
        name: '我的消息',
        icon: 'Grid',
        category: '1',
        children: [
          {
            name: '我的消息',
            icon: 'Grid',
            category: '2',
            requestPath: '/work/news/myNews',
            componentPath: 'work/news/myNews/index',
            hiddenStatus: "0",
            cacheStatus: null
          },
        ]
      },
      {
        name: '我的审批',
        icon: 'Grid',
        category: '1',
        children: [
          {
            name: '待我审批',
            icon: 'Grid',
            category: '2',
            requestPath: '/work/approval/waitApproval',
            componentPath: 'work/approval/waitApproval/index',
            hiddenStatus: "0",
            cacheStatus: null
          },
          {
            name: '我已审批',
            icon: 'Grid',
            category: '2',
            requestPath: '/work/approval/haveApproved',
            componentPath: 'work/approval/haveApproved/index',
            hiddenStatus: "0",
            cacheStatus: null
          },
          {
            name: '我发起的',
            icon: 'Grid',
            category: '2',
            requestPath: '/work/approval/initiateApproval',
            componentPath: 'work/approval/initiateApproval/index',
            hiddenStatus: "0",
            cacheStatus: null
          },
        ]
      },
    ]
  },
  {
    name: '客户',
    icon: 'Grid',
    category: '1',
    children: [
      {
        name: '我的客户',
        icon: 'Grid',
        category: '2',
        requestPath: '/customer/myCustomer',
        componentPath: 'customer/myCustomer/index',
        hiddenStatus: "0",
        cacheStatus: null
      },
      {
        name: '客户分类',
        icon: 'Grid',
        category: '2',
        requestPath: '/customer/customerCategory',
        componentPath: 'customer/customerCategory/index',
        hiddenStatus: "0",
        cacheStatus: null
      },
      {
        name: '客户级别',
        icon: 'Grid',
        category: '2',
        requestPath: '/customer/customerLevel',
        componentPath: 'customer/customerLevel/index',
        hiddenStatus: "0",
        cacheStatus: null
      }
    ]
  },
  {
    name: '员工',
    icon: 'Grid',
    category: '1',
    children: [
      {
        name: '员工管理',
        icon: 'Grid',
        category: '2',
        requestPath: '/staff/staffManage',
        componentPath: 'staff/staffManage/index',
        hiddenStatus: "0",
        cacheStatus: null
      },

    ]
  },
]

