let role = localStorage.getItem('role');
let item = [
  {
    name: '観光地管理',
    url: '/posts',
    icon: 'icon-pencil',
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
