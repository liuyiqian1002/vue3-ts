<template>
    <div class="photograph_lists">
        <div class="tw" v-if="lists && lists.length > 0">
            <div class="tw_y mr10 mb20 ml10 b_radius overflow" v-for="(item, i) in lists" :key="i">
                <el-image :src="item.imgUrl" style="width: 200px; height: 200px" :preview-src-list="srcList"
                    :initial-index="i" hide-on-click-modal></el-image>
                <div class="tw_y pt5 pb5 pl10 white bgPrimary">
                    <p>{{ item.plateNum }} {{ item.runningSpeed + 'KM/H' }}</p>
                    <p>{{ item.gpsTime }}</p>
                </div>
            </div>
        </div>
        <div class="tw" v-else>
            <div class="tw_y ml20 mt20">暂无数据</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getPhotoList } from "@/api/dynamicMonitoring/eventTracking"
import { EventItem } from "../types";
const { row } = defineProps<{
    row?: EventItem, // 单个处理
}>()

const proxy: any = getCurrentInstance()?.proxy
const form = reactive({
    "gpsTime": row.gpsTime || row.eventStartTime,
    "plateNum": row.plateNum,
    "vehicleCode": row.vehicleCode
})
let lists = $ref([])
let srcList = $ref([])

getPhotoList(form).then(res => {
    if (res) {
        lists = res
        srcList = proxy.$_.map(res, 'imgUrl')
    }
})

</script>

<style scoped lang="scss"></style>

