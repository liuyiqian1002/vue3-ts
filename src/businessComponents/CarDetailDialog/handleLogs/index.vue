<template>
    <div class="handle-logs-wrapper" v-if="logsList.length > 0">
        <div class="list-item-wrapper" v-for="(item,index) in logsList" :key="index">
            <div class="left-wrapper">
                <div class="out-circle">
                    <div class="inner-circle">{{item.logType?.substr(0,1)}}</div>
                </div>
                <div class="time">{{item.time}}</div>
                <div class="date">{{item.date}}</div>
            </div>
            <div class="right-wrapper">
                <p>{{item.logType}}</p>
                <p>{{item.desc}}</p>
                <!-- <div class="image-wrapper">
                    <div v-for="(it,index) in it.fileList" :key="it.fileId + index"></div>
                    <el-image :src="it.thumbnailViewUrl"></el-image>
                </div> -->
            </div>
        </div>
    </div>
    <div class="handle-logs-wrapper" v-else>
        <div class="no-data">暂无数据</div>
    </div>
</template>

<script setup lang="ts">
import { getEventLogs } from "@/api/dynamicMonitoring/eventTracking"
import { EventItem } from '../types'
const { row } = defineProps<{
    title: String,
    row: EventItem
}>()
const proxy: any = getCurrentInstance()?.proxy
let itemInfo: EventItem = row
interface EventLogsQuery {
    alarmEventId: number,
    eventId: string
}


let logsList = $ref([])
// logsList = [
//     {date: '2023-01-02',desc: '超级管理员，无效警情，处理内容：123;标记为“无效警情”',fileList: [{thumbnailViewUrl:'',viewUrl:'',fileName:'',uploadName:''}],logType:'人工',processMethod:0}
// ]
const query: EventLogsQuery = {
    alarmEventId: itemInfo.alarmEventId,
    eventId: itemInfo.eventId
}

getEventLogs(query).then(res => {
    console.log(res, 'getEventLogs res')
    if(res) {
        res = res.map(item => {
            let arr = item.date?.split(' ')
            item.time = arr[1]
            item.date = arr[0]
            return item
        })
        logsList = res
    }
    //  else {
    //     ElMessage.error('操作失败')
    // }
})
onMounted(() => {
    console.log('handlelogs onMounted')
})
</script>

<style scoped lang="scss">
.handle-logs-wrapper {
    margin-top: 20px;
    height: 660px;
    overflow: scroll;
    .list-item-wrapper{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .left-wrapper{
            display: flex;
            // justify-content: flex-start;
            align-items: center;
            flex-direction: column;
            width: 160px;
            .out-circle{
                width: 44px;
                height: 44px;
                border-radius: 50%;
                border: 1px solid #0188fb;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                .inner-circle{
                    width: 38px;
                    height: 38px;
                    line-height: 40px;
                    font-size: 18px;
                    color: #FFF;
                    background: #0188fb;
                    border-radius: 50%;
                }
            }
            &>div{
                margin: 5px 0;
            }
        }
        .right-wrapper{
            margin-left: 10px;
            background: #f0f3f5;
            width: 100%;
            height: 100px;
            box-sizing: border-box;
            padding: 8px;
            border-radius: 5px;
            p{
                margin-top: 6px;
            }
            .image-wrapper{
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }
        }
    }
    .no-data{
        margin-top: 20px;
        margin-left: 20px;
        font-size: 18px;
        // text-align: center;
    }
}
</style>
