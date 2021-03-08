import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Map',
    meta: { layout: 'map-layout' },
    component: () => import(/* webpackChunkName: "map" */ '../views/Map.vue')
  },
  {
    path: '/impressum',
    name: 'Impressum',
    meta: { layout: 'appbar-layout', title: 'Impressum' },
    component: () => import(/* webpackChunkName: "impressum" */ '../views/Impressum.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: { layout: 'appbar-layout', title: 'About' },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: { name: 'admin-locations' }
  },
  // {
  //   path: '/admin/dashboard',
  //   name: 'dashboard',
  //   meta: { layout: 'admin-layout', title: 'Dashboard' },
  //   component: () =>
  //     import(/* webpackChunkName: "adminLocationList" */ '../views/Admin/Dashboard.vue')
  // },
  {
    path: '/admin/location',
    name: 'admin-locations',
    meta: { layout: 'admin-layout', title: 'Locations' },
    component: () =>
      import(/* webpackChunkName: "adminLocationList" */ '../views/Admin/Location/LocationList.vue')
  },
  {
    path: '/admin/location/add',
    name: 'admin-location-add',
    meta: { layout: 'admin-layout', title: 'Add new Location' },
    component: () =>
      import(/* webpackChunkName: "adminLocationList" */ '../views/Admin/Location/LocationAdd.vue')
  },
  {
    // TMP: Please add a NotFoundComponent!
    path: '*',
    component: () => import(/* webpackChunkName: "map" */ '../views/Map.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
