import { createRouter, createWebHashHistory } from 'vue-router'



import Layout from '~/views/layout/index.vue'
import Home from '~/views/home.vue'
import Video from '~/views/video.vue'
import News from '~/views/news.vue'
import Me from '~/views/me.vue'
import Login from '~/views/login/index.vue'
import Search from '~/views/search/index.vue'
import Article from '~/views/article/index.vue'
import Compile from '~/views/compile/compile.vue'
import CompileName from '~/views/compile/name.vue'
import VideoDetail from '~/views/video/video.vue'
import AttentionList from '~/views/attention/list.vue'
import FansList from '~/views/fans/fans.vue'
import CollectList from '~/views/collect/collect.vue'
import sMate from '~/views/smate/index.vue'
import historyList from '~/views/history/history.vue'
// 1、创建路由规则
const routes = [
    {
        path: "/",
        component: Layout,
        children: [
            {
                path: '/',
                redirect: '/home',
            },
            {
                path: "/home",
                name: "home",
                component: Home,

            },
            {
                path: "/video",
                name: "video",
                component: Video,
            },
            {
                path: "/news",
                name: "news",
                component: News,
            },
            {
                path: "/me",
                name: "me",
                component: Me,
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    // 用户信息修改
    {
        path: '/compile',
        name: 'compile',
        component: Compile,

    },
    {
        path: "/name",
        name: "name",
        component: CompileName,
    },
    //视频详情Video
    {
        path: "/videoDetail/:articleId",
        name: "videoDetail",
        component: VideoDetail,
        props: true
    },
    //用户关注列表AttentionList
    {
        path: "/attentionList",
        name: "attentionList",
        component: AttentionList,
    },
    //用户粉丝列表
    {
        path: "/fansList",
        name: "fansList",
        component: FansList,
    },
    //用户收藏列表
    {
        path: "/collectList",
        name: "collectList",
        component: CollectList,
    },
    //用户阅读历史historyList
    {
        path: "/historyList",
        name: "historyList",
        component: historyList,
    },
    //小智同学
    {
        path: "/sMate/:articleId",
        name: "sMate",
        component: sMate,
        props: true
    },
    {
        path: '/article/:articleId',
        name: 'article',
        component: Article,
        // 将动态路由的参数映射到组件的props中，无论是访问还是维护性都很方便
        props: true
    },
]
// 2、创建路由实例
const router = createRouter({
    history: createWebHashHistory(),
    routes
});


export default router;
// 3、创建登录组件
// 4、指定出口