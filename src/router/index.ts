import { createWebHashHistory, createRouter } from 'vue-router'
import Layout from '@/layout/index.vue'

// @ts-ignore
import systemManagement from './systemManagement/index.ts' // 系统管理
import operationsmanagement from './operationsmanagement/index.ts' // 运营管理
import dynamicMonitoring from './dynamicMonitoring/index.ts' // 运营管理
import largeScreenDynamic from './largeScreenDynamic/index.ts' // 大屏动态
import statisticalStatement from './statisticalStatement/index.ts' // 统计报表
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/pages/login/index.vue'),
        hidden: true,
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'BasicLayout',
        children: [
            {
                path: '/',
                component: () => import('@/pages/home/index.vue'),
                name: 'home',
                hidden: true,
                meta: {
                    title: '首页',
                    permissions: ['index-message-dclb-xz'],
                    icon: 'home',
                    affix: true,
                    local: true,
                    isContent: true,
                },
            },
            {
                path: '/users',
                component: () => import('@/pages/users/index.vue'),
                name: 'users',
                hidden: true,
                meta: {
                    title: '用户',
                    icon: 'users',
                    affix: true,
                    local: true,
                    isContent: true,
                },
            },
            {
                path: '/404',
                meta: {title: '404', name: '404'},
                component: () => import('@/pages/error-page/404.vue'),
                hidden: true,
            }
        ],
    },
    {
        name: 'Users', meta: { title: '用户', icon: 'iconziyuan111' }, component: Layout, path: '/users', children: [
            {
                parentId: 'Users',
                name: 'User',
                meta: { title: '用户', name: 'Users', icon: 'iconziyuan111' },
                component: () => import('@/pages/users/index.vue'),
                path: '/users',
            },
            {
                parentId: 'Users',
                name: 'UserDetail',
                meta: { title: '用户详情', name: 'UserDetail', icon: 'iconshujuquanxian' },
                component: () => import('@/pages/users/userDetails/index.vue'),
                path: '/users/userDetails',
            }
        ]
    },
    {
        title: 'demo', component: Layout, path: '/demo', children: [
            {
                name: 'demo',
                meta: { title: 'demo', name: 'Posts', icon: 'iconqudaoguanli' },
                component: () => import('@/pages/demo/index.vue'),
                path: '/demo',
            },
            // echarts图表组件
            {
                name: 'echartsLick',
                // level: 2,
                meta: { title: 'charts', name: 'EChartsLink', icon: 'iconzhexiantu' },
                component: () => import('@/pages/demo/echartsLink/index.vue'),
                path: '/demo/echartsLink',
            },
            // 上传组件
            {
                name: 'uploadLink',
                meta: { title: 'upload', name: 'UploadLink', icon: 'iconzhexiantu' },
                component: () => import('@/pages/demo/uploadLink/index.vue'),
                path: '/demo/uploadLink',
            },
            // 下拉树组件
            {
                name: 'treeLink',
                meta: { title: 'tree', name: 'TreeLink', icon: 'iconzhexiantu' },
                component: () => import('@/pages/demo/treeLink/index.vue'),
                path: '/demo/treeLink',
            },
        ]
    },
    {

        name: 'Elements', component: Layout,
        meta: { title: 'ElementPlus', icon: 'iconzhexiantu' },
        path: '/element', children: [
            {
                parentId: 'Elements',
                name: 'Element',
                meta: { title: 'ElementPlus', name: 'UI Element', icon: 'iconkaifangpingtai' },
                component: () => import('@/pages/element/index.vue'),
                path: '/element'
            },
            {
                parentId: 'Elements',
                name: 'table',
                level: 2,
                meta: { title: 'ElementTable', name: 'ECharts', icon: 'iconzhexiantu' },
                component: () => import('@/pages/element/table/index.vue'),
                path: '/element/table',
            },
        ]
    },
    {
        name: 'forms', component: Layout, path: '/forms', children: [
            {
                parentId: 'forms',
                name: 'form',
                meta: { title: 'form-基础渲染', name: 'form-基础渲染', icon: 'iconkaifangpingtai' },
                component: () => import('@/pages/form/index.vue'), path: '/form',
            }
        ]
    },
    systemManagement,   // 系统管理
    operationsmanagement, //运营管理
    dynamicMonitoring, // 动态监测
    largeScreenDynamic, // 大屏动态
    statisticalStatement, // 统计报表
    // {
    //     path: '/404',
    //     meta: {title: '404', name: '404'},
    //     component: () => import('@/pages/error-page/404.vue'),
    //     hidden: true,
    // }
    // {
    //     path: "/:pathMatch(.*)", // 不识别的path自动匹配404
    //     redirect: '/404',
    // },
    // {
    //     path: '/401',
    //     component: () => import('@/views/error-page/401'),
    //     hidden: true,
    // },
]

export const router = createRouter({
    history: createWebHashHistory(),
    // @ts-ignore
    routes: constantRoutes
})

// console.log(router)
export default router
