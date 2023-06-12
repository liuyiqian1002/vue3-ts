<template>
    <div class="photograph_lists">
        <div class="tw">
            <div class="tw_cy" v-for="(item, i) in lists" :key="i">
                <el-image :src="item.imgUrl" style="width: 200px; height: 200px" :preview-src-list="srcList"
                    :initial-index="i"></el-image>
                <div>
                    <p>{{ item.plateNum }} {{ item.runningSpeed }}</p>
                    <p>{{ item.gpsTime }}</p>
                </div>
            </div>
            <div style="padding: 30px;font-size: 18px;" v-if="!lists || lists.length === 0">
                <div class="no-data">暂无数据</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getViolationPhotoList } from "@/api/dynamicMonitoring/eventTracking"
import { EventItem } from "../types";
const { row } = defineProps<{
    row?: EventItem, // 单个处理
}>()

const proxy: any = getCurrentInstance()?.proxy

let lists = $ref([])
let srcList = $ref([])

getViolationPhotoList({ alarmEventId: row?.alarmEventId }).then(res => {
    console.log(res, 'getViolationPhotoList')
    if (res && res.rows && res.rows.length > 0) {
        lists = res.rows
        srcList = proxy.$_.map(res.rows, 'imgUrl')
    } else {
        console.log('无数据')
    }
})

</script>

<style scoped lang="scss"></style>

