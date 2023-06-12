<template>
    <div class="feedback-process-wrapper">
        <div class="title mt10 mb10">反馈内容</div>
        <el-col :span="widthSpan || 16">
            <el-form :model="form" label-width="120px">
                <el-form-item label="反馈类型">
                    <el-select v-model="form.appealTypeCode" placeholder="请选择反馈类型">
                        <el-option label="申诉" :value="100" />
                        <el-option label="回执" :value="200" />
                    </el-select>
                </el-form-item>
                <el-form-item label="申诉原因">
                    <el-select v-model="form.appealReasonCode" placeholder="请选择申诉原因">
                        <el-option v-for="item in alarmAppealReason" :label="item.label" :value="item.value" />
                        <!-- <el-option label="轨迹不完整" value="2" />
                        <el-option label="其他" value="3" /> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="反馈说明">
                    <el-input v-model="form.feedbackDesc" type="textarea" />
                </el-form-item>
                <el-form-item>
                    <upload v-model="form.fileUrl" v-model:id="form.fileId" uploadTxt="照片附件"></upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </div>
</template>

<script setup lang="ts">
import { batchAddAppeal, BatchAddAppealQuery, addAppeal, AddAppealQuery } from "@/api/operation/closedloopmanagement/alarmappeal"
import { EventItem } from "../types";
const { row, list } = defineProps<{
    widthSpan?: number
    row?: EventItem, // 单个处理
    list?: Array<EventItem> // 批量处理
    close?: Function
}>()

console.log(row, list, 'props')
const proxy: any = getCurrentInstance()?.proxy
const alarmAppealReason = proxy.$store.getters.arrEnumerate['alarmAppealReason']
const form = $ref({
    appealContent: '',
    appealReasonCode: null,
    appealTypeCode: null,
    // feedbackDesc: '',
    fileId: '',
    fileUrl: '',
})
// 处理方式枚举
// const vaildAlarmTypes = $ref(proxy.$store.getters.arrEnumerate.vaildAlarmTypes)
// console.log(row, vaildAlarmTypes, 'row')

const onSubmit = () => {
    if (list && list.length > 0) {
        // 批量处理
        let query: BatchAddAppealQuery = {
            alarmEventIdList: [],
            appealContent: form.appealContent,
            appealReasonCode: form.appealReasonCode,
            appealTypeCode: form.appealTypeCode,
            imgIdList: [form.fileId]
        }
        list.forEach(it => {
            query.alarmEventIdList.push(it.alarmEventId)
        })
        console.log(query, 'query batch')
        batchAddAppeal(query).then(res => {
            console.log(res, 'batchAddAppeal res')
            if (res || res === null) {
                ElMessage.success('操作成功')
                if(close) {
                    close()
                }
            } else {
                ElMessage.error('操作失败')
            }
        })
        return
    }
    const query: AddAppealQuery = {
        alarmEventId: row.alarmEventId,
        // eventId: row.eventId,
        appealContent: form.appealContent,
        appealReasonCode: form.appealReasonCode,
        appealTypeCode: form.appealTypeCode,
        imgIdList: []
    }
    console.log(query, row, 'submit!')
    addAppeal(query).then(res => {
        console.log(res, 'addAppeal res')
        if (res || res === null) {
            ElMessage.success('操作成功')
        } else {
            ElMessage.error('操作失败')
        }
    })
}



</script>

<style scoped lang="scss">
.feedback-process-wrapper {
    .title{
        text-align: left;
    }
    padding-left: 30px;
    :deep(.el-button) {
        width: 100px;
        // // height: 28px;
        // border: 1px solid #28bbd0;
        // // border-radius: 16px;
        // text-align: center;
        // // line-height: 28px;
        // font-size: 12px;
        // margin: 10px auto 0;
        // padding: 0;
        // color: #28bbd0;
        // background: #fff;
    }

    :deep(.el-select) {
        .el-input {
            width: 500px;
        }
    }

    .el-textarea {
        width: 500px;
    }
}
</style>

