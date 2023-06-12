<template>
    <div class="feedback-process-wrapper">
        <div>
            <div class="title mt10">反馈内容</div>
            <el-row class="row-wrapper">
                <el-col :span="titleSpan">反馈类型：</el-col>
                <el-col :span="5">{{ row.appealTypeName || '-' }}</el-col>
            </el-row>
            <el-row class="row-wrapper">
                <el-col :span="titleSpan">反馈时间：</el-col>
                <el-col :span="5">{{ row.appealTimeStr || '-'  }}</el-col>
            </el-row>
            <el-row class="row-wrapper">
                <el-col :span="titleSpan">反馈账号：</el-col>
                <el-col :span="5">{{ row.appealPerson || '-'  }}</el-col>
            </el-row>
            <el-row class="row-wrapper">
                <el-col :span="titleSpan">申诉原因：</el-col>
                <el-col :span="5">{{ row.appealReasonName || '-'  }}</el-col>
            </el-row>
            <el-row class="row-wrapper">
                <el-col :span="titleSpan">反馈内容：</el-col>
                <el-col :span="5">{{ row.appealContent || '-'  }}</el-col>
            </el-row>
            <el-row class="row-wrapper">
                <el-col :span="titleSpan">反馈附件：</el-col>
                <el-col :span="5">
                    <el-image v-for="it in row.imgList" :src="it"></el-image>
                </el-col>
            </el-row>
        </div>
        <div>
            <div class="title mt10">反馈处理</div>
            <el-row class="row-wrapper">
                <el-col :span="titleSpan">处理状态：</el-col>
                <el-col :span="5">{{ row.appealStatusName || '-'  }}</el-col>
            </el-row>
            <el-row class="row-wrapper">
                <el-col :span="titleSpan">处理结果：</el-col>
                <el-col :span="5">{{ row.appealResultName || '-'  }}</el-col>
            </el-row>
            <el-row class="row-wrapper">
                <el-col :span="titleSpan">处理方式：</el-col>
                <el-col :span="5">
                    <el-select v-model="form.appealResultCode" placeholder="请选择反馈类型" :disabled="precessed">
                        <el-option label="设为无效" :value="100" />
                        <el-option label="不予处理" :value="200" />
                    </el-select>
                </el-col>
            </el-row>
            <el-row class="row-wrapper">
                <el-col :span="titleSpan">一审说明：</el-col>
                <el-col :span="5">
                    <el-input v-model="form.processRemark1" :disabled="precessed" type="textarea" />
                </el-col>
            </el-row>
            <el-row class="row-wrapper">
                <el-col :span="titleSpan">终审说明：</el-col>
                <el-col :span="5">
                    <el-input v-model="form.processRemark2" :disabled="precessed" type="textarea" />
                </el-col>
            </el-row>
        </div>
        <el-row class="btn-wrapper" v-if="!precessed">
            <el-col :span="5">
                <el-button type="primary" @click="() => onSubmit(0)">平台审核</el-button>
            </el-col>
            <el-col :span="5">
                <el-button type="primary" @click="() => onSubmit(1)">管理部门审核</el-button>
            </el-col>
        </el-row>

    </div>
</template>

<script setup lang="ts">
import { batchEditAppeal, BatchEditAppealQuery, addAppeal, AddAppealQuery, AppealProcessRes } from "@/api/operation/closedloopmanagement/appealprocess"
const { row, list } = defineProps<{
    widthSpan?: number
    row?: AppealProcessRes, // 单个处理
    list?: Array<AppealProcessRes> // 批量处理
    close?: Function
}>()

// 判断是否是已处理状态
let precessed: boolean = row.appealStatusCode === 300

const titleSpan = 3

console.log(row, list, 'props')
const proxy: any = getCurrentInstance()?.proxy
// const alarmAppealReason = proxy.$store.getters.arrEnumerate['alarmAppealReason']
const form = $ref({
    appealContent: '',
    appealReasonCode: null,
    appealStatusCode: null,
    appealResultCode: null,
    processRemark1: '',
    processRemark2: '',
    fileId: '',
    fileUrl: '',
})
// 处理方式枚举
// const vaildAlarmTypes = $ref(proxy.$store.getters.arrEnumerate.vaildAlarmTypes)
// console.log(row, vaildAlarmTypes, 'row')

const onSubmit = (type: number) => {
    if (list && list.length > 0) {
        // 批量处理
        let query: BatchEditAppealQuery = {
            alarmEventIdList: [],
            processRemark1: form.processRemark1,
            processRemark2: form.processRemark2,
            appealResultCode: form.appealResultCode,
            appealStatusCode: form.appealStatusCode,
            processingDepartment: type
        }
        list.forEach(it => {
            query.alarmEventIdList.push(it.alarmEventId)
        })
        console.log(query, 'query batch')
        batchEditAppeal(query).then(res => {
            console.log(res, 'batchAddAppeal res')
            if (res || res === null) {
                ElMessage.success('操作成功')
                if (close) {
                    close()
                }
            } else {
                ElMessage.error('操作失败')
            }
        })
        return
    }
    const query: AddAppealQuery = {
        alarmAppealId: row.alarmAppealId,
        // appealResultCode: row.appealResultCode,
        // appealResultName: row.appealResultName,
        // appealStatusCode: row.appealStatusCode,
        // appealStatusName: row.appealStatusName,
        // lastModifiedTime: row.lastModifiedTime,
        // lastModifiedUser: row.lastModifiedUser,
        processPerson: row.processPerson,
        processRemark1: form.processRemark1,
        processRemark2: form.processRemark2,
        processTime: row.processTime,
        processingDepartment: type,
        // eventId: row.eventId,
        // appealContent: form.appealContent,
        // appealReasonCode: form.appealReasonCode,
        // appealTypeCode: form.appealTypeCode,
        // imgIdList: []
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
    .row-wrapper {
        padding: 10px 5px;
        background: #fafafa;
    }

    .btn-wrapper {
        margin-top: 15px;
    }

    .title {
        padding: 10px 5px;
        text-align: left;
        width: 100%;
        background: #f2f2f2;
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

