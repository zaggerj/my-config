import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
    path: "/home",
    name: "Home",
    component: () =>
        import ("../views/home/Home.vue")
}, {
    path: "/about",
    name: "About",
    component: () =>
        import ("../views/about/About.vue")
}, {
    path: "/role",
    name: "Role",
    component: () =>
        import ("../views/role/Role.vue")
},];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;