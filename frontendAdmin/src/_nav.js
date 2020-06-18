let item = [
  {
    name: '観光地管理',
    url: '/posts',
    icon: 'icon-pencil',
    children: [
      {
        name: '新しい観光地管理',
        url: '/registeredposts',
        icon: 'icon-arrow-right',
      },
      {
        name: '観光地管理',
        url: '/posts',
        icon: 'icon-arrow-right',
      },

    ],
  },
  {
    name: 'ユーザー管理',
    url: '/users',
    icon: 'icon-people',
  },
  // {
  //   name: 'Quản lý bài viết',
  //   url: '/lists',
  //   icon: 'icon-puzzle',
  // },
];
export default {
  items: item
};
