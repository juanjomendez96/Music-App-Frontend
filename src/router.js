import Vue from "vue";
import Router from "vue-router";
import GlobalTable from "./views/GlobalTable.vue";
import Home from "./views/Home.vue";
import ChartGlobal from "./views/ChartGlobal.vue";
import Login from "./views/Login.vue";
import Register from './views/Register';

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      props:true
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      props:true
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      props:true
    },
    {
      path: "/artists",
      name: "Artists",
      component: GlobalTable,
      props:true
    },
    {
      path: "/artists/:id",
      name: "Individual Artist",
      component: GlobalTable,
      props:true
    },
    {
      path: "/artists/:id/albums",
      name: "Albums of the artist",
      component: GlobalTable,
      props:true
    },
    {
      path: "/albums",
      name: "Albums",
      component: GlobalTable,
      props:true
    },
    {
      path: "/albums/:id",
      name: "Individual Album",
      component: GlobalTable,
      props:true
    },
    {
      path: "/albums/:id/tracks",
      name: "Tracks of the album",
      component: GlobalTable,
      props:true
    },
    {
      path: "/tracks/:id",
      name: "Individual Track",
      component: GlobalTable,
      props:true
    },
    {
      path: "/tracks",
      name: "Tracks",
      component: GlobalTable,
      props:true
    },
    {
      path: "/playlists",
      name: "Playlists",
      component: GlobalTable,
      props:true
    },
    {
      path: "/charts",
      name: "Charts",
      component: ChartGlobal,
      props:true
    },
  ]
});
