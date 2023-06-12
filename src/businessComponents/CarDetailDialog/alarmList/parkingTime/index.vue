<template>
    <div class="parking-time">
        <div style="height: 300px">
            <el-auto-resizer>
                <template #default="{ height, width }">
                    <!--                                            :estimated-row-height="40"-->
                    <el-table-v2
                        :header-height="40"
                        :row-height="40"
                        :columns="mainData.columns"
                        :data="mainData.data"
                        :width="width"
                        :height="height"
                        size="small"
                        fixed
                    />
                </template>
            </el-auto-resizer>
        </div>
    </div>
</template>

<script setup lang="tsx">
import { ElAutoResizer } from 'element-plus'
import { getToken } from '@/utils/auth'

import { getParkingTimeList } from '@/api/dynamicMonitoring/eventTracking'
import { EventItem } from '../../types'

const { row } = defineProps({
    row: { type: Object, default: {} },
})

const proxy: any = getCurrentInstance()?.proxy
let mainData = reactive({
    data: [],
    columns: [
        { title: '序号', width: 220, cellRenderer: (row) => row.rowIndex + 1 },
        {
            width: 250,
            dataKey: 'receiveTime',
            key: 'receiveTime',
            title: '开始时间',
        },
        {
            width: 250,
            dataKey: 'receiveTime',
            key: 'receiveTime',
            title: '结束时间',
        },
        // { width: 150, dataKey: 'msg', key: "msg", title: "行驶方向" },
        { width: 250, dataKey: 'msg', key: 'msg', title: '停车时长' },
        {
            width: 250,
            dataKey: 'locationName',
            key: 'locationName',
            title: '停车位置',
        },
    ],
})

let activeName = $ref('guijishuju')
let trackPatternMapRef = $ref(null)

const itemInfo: EventItem = inject('itemInfo')
// console.log(itemInfo, row, 'itemInfo inject')

watch(
    () => row,
    (val) => {
        getData()
    },
)
const getData = () => {
    const query = {
        plateNum: row.plateNum,
        startTime: row.eventStartTime,
        endTime: row.eventEndTime,
        vehicleCode: row.vehicleCode,
    }
    getParkingTimeList(query).then((res) => {})
}

let drawerFlag = $ref(true)

const handClose = () => {
    debugger
    drawerFlag = false
}

const viewData = () => {
    drawerFlag = true
}

defineExpose({ viewData, handClose })
</script>

<style scoped lang="scss">
.parking-time {
    //
}
</style>
