import Layout from '@/layout/index.vue'
import systemLayout from '@/layout/system.vue'


const operationsmanagement = {

    name: 'operation',
    component: Layout,
    meta: {title: '运营管理', icon: 'xitongguanli'},
    path: '/operation',
    children: [
        {
            name: 'cars',
            component: systemLayout,
            meta: {title: '车辆管理', icon: 'quanxianguanli'},
            path: 'cars',
            children: [
                {
                    name: 'car',
                    meta: { title: '车辆基本信息'},
                    component: () => import('@/pages/operation/cars/car/index.vue'),
                    path: 'car'
                },
                {
                    name: 'practitioner',
                    meta: { title: '从业人员基本信息'},
                    component: () => import('@/pages/operation/cars/practitioner/index.vue'),
                    path: 'practitioner'
                },
                {
                    name: 'vehicleType',
                    meta: { title: '车辆类型管理'},
                    component: () => import('@/pages/operation/cars/vehicleType/index.vue'),
                    path: 'vehicleType'
                },
                {
                    name: 'vehicleTerminal',
                    meta: { title: '车辆终端管理'},
                    component: () => import('@/pages/operation/cars/vehicleTerminal/index.vue'),
                    path: 'vehicleTerminal'
                },
                {
                    name: 'insurance',
                    meta: { title: '车辆保险'},
                    component: () => import('@/pages/operation/cars/insurance/index.vue'),
                    path: 'insurance'
                },
                {
                    name: 'areasearch',
                    meta: { title: '区域查车'},
                    component: () => import('@/pages/operation/cars/areasearch/index.vue'),
                    path: 'areasearch'
                },
            ]
        },
        {
            name: 'businessmanagement',
            component: systemLayout,
            meta: {title: '企业管理', icon: 'quanxianguanli'},
            path: 'businessmanagement',
            children: [
                {
                    name: 'basicinformation',
                    meta: { title: '企业基本信息'},
                    component: () => import('@/pages/operation/businessmanagement/basicinformation/index.vue'),
                    path: 'basicinformation'
                },
                {
                    name: 'announcement',
                    meta: { title: '公告管理'},
                    component: () => import('@/pages/operation/businessmanagement/announcement/index.vue'),
                    path: 'announcement'
                },
            ]
        },
        {
            name: 'regulators',
            component: systemLayout,
            meta: {title: '监管部门管理', icon: 'quanxianguanli'},
            path: 'regulators',
            children: [
                {
                    name: 'acopy',
                    meta: { title: '抄告管理'},
                    component: () => import('@/pages/operation/regulators/acopy/index.vue'),
                    path: 'acopy'
                },
                {
                    name: 'supervisioninformation',
                    meta: { title: '监管部门基本信息'},
                    component: () => import('@/pages/operation/regulators/supervisioninformation/index.vue'),
                    path: 'supervisioninformation'
                },
            ]
        },
        {
            name: 'operationOperator',
            component: systemLayout,
            meta: {title: '运营商管理', icon: 'quanxianguanli'},
            path: 'operator',
            children: [
                {
                    name: 'videoconfig',
                    meta: { title: '运营商视频配置'},
                    component: () => import('@/pages/operation/operator/videoconfig/index.vue'),
                    path: 'videoconfig'
                },
                {
                    name: 'operatorCarrierInformation',
                    meta: { title: '运营商基本信息'},
                    component: () => import('@/pages/operation/operator/carrierInformation/index.vue'),
                    path: 'carrierInformation'
                },
            ]
        },
        {

            name: 'alert',
            component: systemLayout,
            meta: {title: '警情配置', icon: 'quanxianguanli'},
            path: 'alert',
            children: [
                {
                    name: 'voluntarily',
                    meta: { title: '自动处警配置'},
                    component: () => import('@/pages/operation/alert/voluntarily/index.vue'),
                    path: 'voluntarily'
                },
                {
                    name: 'artificial',
                    meta: { title: '人工处警配置'},
                    component: () => import('@/pages/operation/alert/artificial/index.vue'),
                    path: 'artificial'
                },
                {
                    name: 'accessareaalarm',
                    meta: { title: '进出区域报警'},
                    component: () => import('@/pages/operation/alert/accessareaalarm/index.vue'),
                    path: 'accessareaalarm'
                },
                {
                    name: 'parkingareaalarm',
                    meta: { title: '停车区域报警'},
                    component: () => import('@/pages/operation/alert/parkingareaalarm/index.vue'),
                    path: 'parkingareaalarm'
                },
            ]
        },
        {

            name: 'dispatching',
            component: systemLayout,
            meta: {title: '调度管理', icon: 'quanxianguanli'},
            path: 'dispatching',
            children: [
                {
                    name: 'appointmentsending',
                    meta: { title: '预约发送'},
                    component: () => import('@/pages/operation/dispatching/appointmentsending/index.vue'),
                    path: 'appointmentsending'
                },
                {
                    name: 'template',
                    meta: { title: '模板管理'},
                    component: () => import('@/pages/operation/dispatching/template/index.vue'),
                    path: 'template'
                },
            ]
        },
        {

            name: 'statement',
            component: systemLayout,
            meta: {title: '报表配置', icon: 'quanxianguanli'},
            path: 'statement',
            children: [
                {
                    name: 'type',
                    meta: { title: '报表报警类型配置'},
                    component: () => import('@/pages/operation/statement/type/index.vue'),
                    path: 'type'
                },
                {
                    name: 'push',
                    meta: { title: '报表推送配置'},
                    component: () => import('@/pages/operation/statement/push/index.vue'),
                    path: 'push'
                },
                {
                    name: 'template',
                    meta: { title: '报表模板配置'},
                    component: () => import('@/pages/operation/statement/template/index.vue'),
                    path: 'template'
                },
            ]
        },
        {

            name: 'closedloopmanagement',
            component: systemLayout,
            meta: {title: '闭环管理', icon: 'quanxianguanli'},
            path: 'closedloopmanagement',
            children: [
                {
                    name: 'alarmappeal',
                    meta: { title: '报警申诉'},
                    component: () => import('@/pages/operation/closedloopmanagement/alarmappeal/index.vue'),
                    path: 'alarmappeal'
                },
                {
                    name: 'appealprocess',
                    meta: { title: '申诉处理'},
                    component: () => import('@/pages/operation/closedloopmanagement/appealprocess/index.vue'),
                    path: 'appealprocess'
                },
                {
                    name: 'alarmprocess',
                    meta: { title: '报警处置'},
                    component: () => import('@/pages/operation/closedloopmanagement/alarmprocess/index.vue'),
                    path: 'alarmprocess'
                },
                {
                    name: 'ticketfiles',
                    meta: { title: '罚单档案'},
                    component: () => import('@/pages/operation/closedloopmanagement/ticketfiles/index.vue'),
                    path: 'ticketfiles'
                },
                {
                    name: 'statistics',
                    meta: { title: '报警处理统计'},
                    component: () => import('@/pages/operation/closedloopmanagement/statistics/index.vue'),
                    path: 'statistics'
                },
            ]
        },
        {

            name: 'securitycheck',
            component: systemLayout,
            meta: {title: '安全检查', icon: 'quanxianguanli'},
            path: 'securitycheck',
            children: [
                {
                    name: 'projectclassification',
                    meta: { title: '项目分类'},
                    component: () => import('@/pages/operation/securitycheck/projectclassification/index.vue'),
                    path: 'projectclassification'
                },
                {
                    name: 'checkproject',
                    meta: { title: '检查项目'},
                    component: () => import('@/pages/operation/securitycheck/checkproject/index.vue'),
                    path: 'checkproject'
                },
                {
                    name: 'checkplan',
                    meta: { title: '检查计划'},
                    component: () => import('@/pages/operation/securitycheck/checkplan/index.vue'),
                    path: 'checkplan'
                },
                {
                    name: 'checktask',
                    meta: { title: '检查任务'},
                    component: () => import('@/pages/operation/securitycheck/checktask/index.vue'),
                    path: 'checktask'
                },
            ]
        },
        {

            name: 'filemanagement',
            component: systemLayout,
            meta: {title: '档案管理', icon: 'quanxianguanli'},
            path: 'filemanagement',
            children: [
                {
                    name: 'fileclassification',
                    meta: { title: '档案分类'},
                    component: () => import('@/pages/operation/filemanagement/fileclassification/index.vue'),
                    path: 'fileclassification'
                },
                {
                    name: 'enterprisefiles',
                    meta: { title: '企业档案'},
                    component: () => import('@/pages/operation/filemanagement/enterprisefiles/index.vue'),
                    path: 'enterprisefiles'
                },
                {
                    name: 'regulatoryfiles',
                    meta: { title: '监管档案'},
                    component: () => import('@/pages/operation/filemanagement/regulatoryfiles/index.vue'),
                    path: 'regulatoryfiles'
                },
            ]
        },
        {

            name: 'vehicleinspection',
            component: systemLayout,
            meta: {title: '车辆巡检', icon: 'quanxianguanli'},
            path: 'vehicleinspection',
            children: [
                {
                    name: 'inspectiontasks',
                    meta: { title: '巡检任务列表'},
                    component: () => import('@/pages/operation/vehicleinspection/inspectiontasks/index.vue'),
                    path: 'inspectiontasks'
                },
            ]
        },
    ]
}

export default operationsmanagement
