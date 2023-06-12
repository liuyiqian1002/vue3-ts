import Layout from '@/layout/index.vue'
import systemLayout from '@/layout/system.vue'


const largeScreenDynamic = {

    name: 'largeScreenDynamic',
    component: Layout,
    meta: {title: '大屏动态', icon: 'xitongguanli'},
    path: '/largeScreenDynamic',
    children: [
        {
            name: 'dpdtCahch',
            component: systemLayout,
            meta: {title: '大屏动态', icon: 'quanxianguanli'},
            path: 'dpdtCahch',
            children: [
                {
                    name: 'dataPanel',
                    meta: { title: '数据看板', tagview: false},
                    component: () => import('@/pages/largeScreenDynamic/dataPanel/index.vue'),
                    path: '/largeScreenDynamic/dataPanel'
                },
            ]
        }
    ]
}

export default largeScreenDynamic
