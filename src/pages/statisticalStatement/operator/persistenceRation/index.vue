<template>
    <div>
        <content-main ref="contentMainRef" :mainData="mainData"></content-main>
       
    </div>
</template>


<script setup lang="tsx">
import {
    exportStatisticsConnectRate,
} from '../../../../api/statisticalStatement/operator/persistenceRation/index'

let {proxy} = getCurrentInstance()
let contentMainRef = $ref(null)
let mainData = reactive({
    tableUrl: '/statistics/operatorReport/statisticsConnectRate',
    isCheck: true,
    columns: [
        { prop: 'operatorName', label: '运营商名称' },
        { prop: 'onLineState', label: '实时连通情况', formatter:(row)=> row.onLineState?'在线':'不在线' },
        { prop: 'offLineStartTime', label: '掉线起始时间' },
        { prop: 'offLineDurationCurrent', label: '当前掉线时长' },
        { prop: 'vehicleTotal', label: '实时总车辆数' },
        { prop: 'onLineTotal', label: '实时在线车辆数' },
        { prop: 'onLineDuration', label: '在线时长' },
        { prop: 'offLineDurationTotal', label: '总掉线时长' },
        { prop: 'offLineSum', label: '掉线次数' },
        { prop: 'totalDuration', label: '总时长' },
        { prop: 'connectRate', label: '平台连通率（%）' },
    ],
    headBtns: [
        {
            icon: 'daochu',
            name: '导出',
            click: (row) => {
                let lists = contentMainRef.getAllCheck()
                let ids = proxy.$_.map(lists, 'operatorId')
                let txt =
                    ids.length > 0
                        ? `请确定导出选中的${ids.length}条数据吗？`
                        : `请确定导出全部数据`
                debugger
                proxy
                    .MessageBox({ msg: txt, type: 'warning' })
                    .then((close) => {
    
                        exportStatisticsConnectRate({
                            ...mainData.formData,
                            ...{ ids: ids },
                        })
                            .then((res) => {
                                window.open(res.fileUrl)
                                close()
                            })
                            .catch(() => {
                                close()
                            })
                    })
            },
        },
    ],
    formData: {
        "begDateTime": proxy.$dayjs().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
        "endDateTime": proxy.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
        "operatorId": '',
        "pageNumber": 1,
        "pageSize": 100,
    },
    lists: [
        {label: '运营商', key: 'operatorId', type: 'select', remote: true, url: '/business/operatorEntity/listAssociateOperator', method: 'get', params: {}, props: { label: 'name', value: 'id' }, placeholder: '请选择运营商',},
        {label: ' 时间范围', key: ['begDateTime', 'endDateTime'], type: 'esDate', col: 12, data: { type: 'datetime' } },
    ],
})

const getTable = () => {
    contentMainRef.getTable()
}
</script>

<style scoped lang="scss">
</style>
