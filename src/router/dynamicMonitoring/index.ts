import Layout from '@/layout/index.vue'
import callOnMotion from '@/layout/callOnMotion.vue'
import systemLayout from "@/layout/system.vue";


const dynamicMonitoring = {

    name: 'dynamicMonitoring',
    component: Layout,
    meta: {title: '动态监测', icon: 'xitongguanli'},
    path: '/',
    children: [
        {
            name: 'dtjcCahch',
            component: systemLayout,
            meta: {title: '动态监测', icon: 'quanxianguanli'},
            path: 'dtjcCahch',
            children: [
                {
                    name: 'callOnMotion',
                    component: callOnMotion,
                    path: '/dynamicMonitoring',
                    children: [
                        {
                            name: 'messages',
                            meta: {title: '动态信息', tagview: false},
                            component: () => import('@/pages/dynamicMonitoring/messages/index.vue'),
                            path: '/dynamicMonitoring/messages'
                        },
                        {
                            name: 'eventTracking',
                            meta: {title: '事件跟踪', tagview: false},
                            component: () => import('@/pages/dynamicMonitoring/eventTracking/index.vue'),
                            path: '/dynamicMonitoring/eventTracking'
                        },
                        {
                            name: 'photoQueryContent',
                            meta: {title: '照片查询', tagview: false},
                            component: () => import('@/pages/dynamicMonitoring/photoQueryContent/index.vue'),
                            path: '/dynamicMonitoring/photoQueryContent'
                        },
                    ]
                }
            ]
        }
    ]
}

export default dynamicMonitoring
