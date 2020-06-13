import React from 'react';


const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Posts = React.lazy(() => import('./views/Admin/Posts/Posts'));
const EditPosts = React.lazy(() => import('./views/Admin/Posts/EditPosts'));
const Users = React.lazy(() => import('./views/Admin/Users/Users'));
const UserDetail = React.lazy(() => import('./views/Admin/Users/UserDetail'));
const Lists = React.lazy(() => import('./views/Admin/Lists/Lists'));
const EditList = React.lazy(() => import('./views/Admin/Lists/EditList'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },


  { path: '/posts/edit/:id', name: 'Chi tiết bài viết', component: EditPosts },
  { path: '/posts/', name: '観光地管理', component: Posts },
  { path: '/users/detail/:id', name: 'ユーザーの情報', component: UserDetail },
  { path: '/users', name: 'ユーザー管理', component: Users },
  { path: '/lists/edit/:id', name: 'Duyệt bài viết', component: EditList },
  { path: '/lists', name: 'Quản lý bài viết', component: Lists },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
];

export default routes;
