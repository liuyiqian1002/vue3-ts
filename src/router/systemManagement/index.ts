import Layout from '@/layout/index.vue'
import systemLayout from '@/layout/system.vue'


const systemManagement = {

    name: 'system',
    component: Layout,
    meta: {title: '系统管理', icon: 'xitongguanli'},
    path: '/system',
    children: [
        {

            name: 'management',
            component: systemLayout,
            meta: {title: '权限管理', icon: 'quanxianguanli'},
            path: 'management',
            children: [
                {
                    name: 'menus',
                    meta: { title: '菜单管理'},
                    component: () => import('@/pages/system/management/menus/index.vue'),
                    path: 'menus'
                },
                {
                    name: 'accounts',
                    meta: { title: '账户管理'},
                    component: () => import('@/pages/system/management/accounts/index.vue'),
                    path: 'accounts'
                },
                {
                    name: 'users',
                    meta: { title: '角色管理'},
                    component: () => import('@/pages/system/management/users/index.vue'),
                    path: 'users'
                },
                {
                    name: 'province',
                    meta: { title: '省市区管理'},
                    component: () => import('@/pages/system/management/province/index.vue'),
                    path: 'province'
                },
                {
                    name: 'organization',
                    meta: { title: '机构管理'},
                    component: () => import('@/pages/system/management/organization/index.vue'),
                    path: 'organization'
                },
                {
                    name: 'tissue',
                    meta: { title: '组织管理'},
                    component: () => import('@/pages/system/management/tissue/index.vue'),
                    path: 'tissue'
                },
            ]
        },
        {

            name: 'systemrecord',
            component: systemLayout,
            meta: {title: '系统记录', icon: 'quanxianguanli'},
            path: 'systemrecord',
            children: [
                {
                    name: 'dictionaries',
                    meta: { title: '数据字典'},
                    component: () => import('@/pages/system/systemrecord/dictionaries/index.vue'),
                    path: 'dictionaries'
                },
                {
                    name: 'auditlog',
                    meta: { title: '审计日志'},
                    component: () => import('@/pages/system/systemrecord/auditlog/index.vue'),
                    path: 'auditlog'
                },
                {
                    name: 'loginrecord',
                    meta: { title: '登录记录'},
                    component: () => import('@/pages/system/systemrecord/loginrecord/index.vue'),
                    path: 'loginrecord'
                },
            ]
        },
        {

            name: 'parameterize',
            component: systemLayout,
            meta: {title: '系统记录', icon: 'quanxianguanli'},
            path: 'parameterize',
            children: [
                {
                    name: 'systemlayout',
                    meta: { title: '系统配置'},
                    component: () => import('@/pages/system/parameterize/systemlayout/index.vue'),
                    path: 'systemlayout'
                },
                {
                    name: 'homelayout',
                    meta: { title: '首页配置'},
                    component: () => import('@/pages/system/parameterize/homelayout/index.vue'),
                    path: 'homelayout'
                },
                {
                    name: 'Accessend',
                    meta: { title: '接入端配置'},
                    component: () => import('@/pages/system/parameterize/Accessend/index.vue'),
                    path: 'Accessend'
                },
            ]
        },
    ]
}

export default systemManagement
