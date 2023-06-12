import Layout from '@/layout/index.vue'
import systemLayout from '@/layout/system.vue'


const statisticalStatement = {
    name: 'statisticalStatement',
    component: Layout,
    meta: {title: '统计报表', icon: 'xitongguanli'},
    path: '/statisticalStatement',
    children: [
        {
            name: 'operator',
            component: systemLayout,
            meta: {title: '运营商报表', icon: 'quanxianguanli'},
            path: 'operator',
            children: [
                {
                    name: 'persistenceRation',
                    meta: { title: '运营商平台连通率'},
                    component: () => import('@/pages/statisticalStatement/operator/persistenceRation/index.vue'),
                    path: 'persistenceRation'
                },

            ]
        },
        {
            name: 'warningAnalysis',
            component: systemLayout,
            meta: {title: '警情分析', icon: 'quanxianguanli'},
            path: 'warningAnalysis',
            children: [
                {
                    name: 'offDurationStatistics',
                    meta: { title: '离线时长统计'},
                    component: () => import('@/pages/statisticalStatement/warningAnalysis/offDurationStatistics/index.vue'),
                    path: 'offDurationStatistics'
                },
                {
                    name: 'statusSpotCheck',
                    meta: { title: '车辆状态抽查'},
                    component: () => import('@/pages/statisticalStatement/warningAnalysis/statusSpotCheck/index.vue'),
                    path: 'statusSpotCheck'
                },
                {
                    name: 'alarmDetails',
                    meta: { title: '报警明细统计'},
                    component: () => import('@/pages/statisticalStatement/warningAnalysis/alarmDetails/index.vue'),
                    path: 'alarmDetails'
                },
            ]
        },
        {
            name: 'enterpriseReporting',
            component: systemLayout,
            meta: {title: '企业报表', icon: 'quanxianguanli'},
            path: 'enterpriseReporting',
            children: [
                {
                    name: 'enterpriseReportingDaily',
                    meta: { title: '企业日报'},
                    component: () => import('@/pages/statisticalStatement/enterpriseReporting/daily/index.vue'),
                    path: 'daily'
                },
                {
                    name: 'enterpriseReportingWeek',
                    meta: { title: '企业周报'},
                    component: () => import('@/pages/statisticalStatement/enterpriseReporting/week/index.vue'),
                    path: 'week'
                },
                {
                    name: 'enterpriseReportingMonth',
                    meta: { title: '企业月报'},
                    component: () => import('@/pages/statisticalStatement/enterpriseReporting/month/index.vue'),
                    path: 'month'
                },
                {
                    name: 'enterpriseReportingAutomaticSending',
                    meta: { title: '企业报表自动发送'},
                    component: () => import('@/pages/statisticalStatement/enterpriseReporting/automaticSending/index.vue'),
                    path: 'automaticSending'
                },
                {
                    name: 'offLineRegistration',
                    meta: { title: '离线登记统计'},
                    component: () => import('@/pages/statisticalStatement/enterpriseReporting/offLineRegistration/index.vue'),
                    path: 'offLineRegistration'
                },
            ]
        },
        {
            name: 'supervisoryStatement',
            component: systemLayout,
            meta: {title: '监管报表', icon: 'quanxianguanli'},
            path: 'supervisoryStatement',
            children: [
                {
                    name: 'daily',
                    meta: { title: '监管日报'},
                    component: () => import('@/pages/statisticalStatement/supervisoryStatement/daily/index.vue'),
                    path: 'daily'
                },
                {
                    name: 'week',
                    meta: { title: '监管周报'},
                    component: () => import('@/pages/statisticalStatement/supervisoryStatement/week/index.vue'),
                    path: 'week'
                },
                {
                    name: 'month',
                    meta: { title: '监管月报'},
                    component: () => import('@/pages/statisticalStatement/supervisoryStatement/month/index.vue'),
                    path: 'month'
                },
                {
                    name: 'proMonth',
                    meta: { title: '省局月报'},
                    component: () => import('@/pages/statisticalStatement/supervisoryStatement/proMonth/index.vue'),
                    path: 'proMonth'
                },
                {
                    name: 'automaticSending',
                    meta: { title: '监管报表自动发送'},
                    component: () => import('@/pages/statisticalStatement/supervisoryStatement/automaticSending/index.vue'),
                    path: 'automaticSending'
                },
            ]
        },
        {
            name: 'fiveRateTest',
            component: systemLayout,
            meta: {title: '五率考核', icon: 'quanxianguanli'},
            path: 'fiveRateTest',
            children: [
                {
                    name: 'SupervisionOftwo',
                    meta: { title: '监管考核表（两客一危）'},
                    component: () => import('@/pages/statisticalStatement/fiveRateTest/SupervisionOftwo/index.vue'),
                    path: 'SupervisionOftwo'
                },
                {
                    name: 'SupervisionGeneralCargo',
                    meta: { title: '监管考核表（普货）'},
                    component: () => import('@/pages/statisticalStatement/fiveRateTest/SupervisionGeneralCargo/index.vue'),
                    path: 'SupervisionGeneralCargo'
                },
                {
                    name: 'operatorOftwo',
                    meta: { title: '运营考核表（两客一危）'},
                    component: () => import('@/pages/statisticalStatement/fiveRateTest/operatorOftwo/index.vue'),
                    path: 'operatorOftwo'
                },
                {
                    name: 'operatorGeneralCargo',
                    meta: { title: '运营考核表（普货）'},
                    component: () => import('@/pages/statisticalStatement/fiveRateTest/operatorGeneralCargo/index.vue'),
                    path: 'operatorGeneralCargo'
                },
                {
                    name: 'enterpriseAssessment',
                    meta: { title: '企业考核表'},
                    component: () => import('@/pages/statisticalStatement/fiveRateTest/enterpriseAssessment/index.vue'),
                    path: 'enterpriseAssessment'
                },
            ]
        },
        {
            name: 'fiveFactorAnalysis',
            component: systemLayout,
            meta: {title: '五率分析', icon: 'quanxianguanli'},
            path: 'fiveFactorAnalysis',
            children: [
                {
                    name: 'carNetInSituationStatistics',
                    meta: { title: '车辆入网情况统计'},
                    component: () => import('@/pages/statisticalStatement/fiveFactorAnalysis/carNetInSituationStatistics/index.vue'),
                    path: 'carNetInSituationStatistics'
                },
                {
                    name: 'carUpOnlineSituationStatistics',
                    meta: { title: '车辆上线情况统计'},
                    component: () => import('@/pages/statisticalStatement/fiveFactorAnalysis/carUpOnlineSituationStatistics/index.vue'),
                    path: 'carUpOnlineSituationStatistics'
                },
                {
                    name: 'carOnlineSituationStatistics',
                    meta: { title: '车辆在线情况统计'},
                    component: () => import('@/pages/statisticalStatement/fiveFactorAnalysis/carOnlineSituationStatistics/index.vue'),
                    path: 'carOnlineSituationStatistics'
                },
                {
                    name: 'trajectoryIntegrityRate',
                    meta: { title: '轨迹完整率统计'},
                    component: () => import('@/pages/statisticalStatement/fiveFactorAnalysis/trajectoryIntegrityRate/index.vue'),
                    path: 'trajectoryIntegrityRate'
                },
                {
                    name: 'satellitePositioningDriftRate',
                    meta: { title: '卫星定位漂移率统计'},
                    component: () => import('@/pages/statisticalStatement/fiveFactorAnalysis/satellitePositioningDriftRate/index.vue'),
                    path: 'satellitePositioningDriftRate'
                },
                {
                    name: 'dataAcceptanceRate',
                    meta: { title: '数据合格率统计'},
                    component: () => import('@/pages/statisticalStatement/fiveFactorAnalysis/dataAcceptanceRate/index.vue'),
                    path: 'dataAcceptanceRate'
                },
                {
                    name: 'quintupleSum',
                    meta: { title: '五率合计统计'},
                    component: () => import('@/pages/statisticalStatement/fiveFactorAnalysis/quintupleSum/index.vue'),
                    path: 'quintupleSum'
                },
            ]
        },
        {
            name: 'briefingAnalysis',
            component: systemLayout,
            meta: {title: '简报分析', icon: 'quanxianguanli'},
            path: 'briefingAnalysis',
            children: [
                {
                    name: 'analysisBriefing',
                    meta: { title: '分析简报'},
                    component: () => import('@/pages/statisticalStatement/briefingAnalysis/analysisBriefing/index.vue'),
                    path: 'analysisBriefing'
                },
            ]
        },
    ]
}

export default statisticalStatement
