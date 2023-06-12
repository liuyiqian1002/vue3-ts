<template>
    <div>
        <tw-drawer @handleClose="handleClose" :loading="state.loading" :title="title" isBtns @cancel="onCancel" @save="onSave"
            v-model="state.drawerFlag">
            <el-form-item label="处警内容">
                <el-input v-model="state.ttsMsg" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }"
                    placeholder="请输入处警内容" />
            </el-form-item>
            <div>
                <p style="color:red;margin-left: 66px;margin-bottom: 20px;">备注:常用语长度不超过500字符</p>
            </div>
            <el-form-item label=" 通配符 " style="align-items: center;">
                <div class="wildcard-item" style="margin-left: 15px !important;" v-for="item, index in wildcards"
                    :key="index" @click="e => onItemClick(item)">{{ item.text }}</div>
            </el-form-item>
            <!-- <el-form-item label="" style="justify-content: center;">
                <el-button type="primary" @click="onSave">保存</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item> -->
        </tw-drawer>
    </div>
</template>

<script setup lang="ts">
import { updateTtsMsg } from "@/api/operation/alert/accessareaalarm";

defineProps({
    title: String,
})

let { proxy } = getCurrentInstance()
let editFormRef = $ref(null)
let row = $ref({})
let state = reactive({
    drawerFlag: false,
    loading: false,
    ttsMsg: '',
})


const setFormData = (obj) => {
    if (obj) {
        // 后台数据会返回null，前端会报错
        row = proxy.$_.cloneDeep(obj)
        console.log(obj, 'obj')
        state.drawerFlag = true
        state.ttsMsg = translateToEng(obj.ttsMsg || '', true)
    } else {
        state.drawerFlag = true
    }
}

const handleClose = () => {
    editFormRef.clearValidate()
    // state.formData = proxy.$_.cloneDeep(editData)
}

let eimts = defineEmits(['getTable'])
const onSave = () => {
    // const ttsMsg = translateToEng(state.ttsMsg)
    if(state.ttsMsg && state.ttsMsg.length > 500) {
        ElMessage.warning('长度不能超过500！')
        return
    }
    state.loading = true
    updateTtsMsg({
        alarmAreaId: row.alarmAreaId,
        ttsMsg: translateToEng(state.ttsMsg)
    }).then(() => {
        state.loading = false
        ElMessage.success('操作成功！')
        state.drawerFlag = false
        eimts('getTable')
    }).catch(() => {
        state.loading = false
    })
}

const onCancel = (val) => {
    state.drawerFlag = false
}

const wildcards = [
    {
        text: '大类替换符',
        reg: /{大类替换符}/g,
        value: 'alarm_type'
    },
    {
        text: '小类替换符',
        reg: /{小类替换符}/g,
        value: 'alarm_subset_type'
    },
    {
        text: '车牌号',
        reg: /{车牌号}/g,
        value: 'plate_num'
    },
    {
        text: '事件开始时间',
        reg: /{事件开始时间}/g,
        value: 'event_start_date'
    },
    {
        text: '当前道路限速值',
        reg: /{当前道路限速值}/g,
        value: 'current_Road_Speed_Limit'
    },
]

const onItemClick = (item) => {
    state.ttsMsg += `{${item.text}}`
}
/**
 * @description 通配符字符与类型值转换
 * @param template 目标字符串
 * @param valueToText 是否是从值转成对应文字
 * 
 */
const translateToEng = (template: string, valueToText?: boolean) => {
    let result = template
    wildcards.map(item => {
        let reg = new RegExp(item.text, 'g')
        let obj = item.value
        if (valueToText) {
            reg = new RegExp(item.value, 'g')
            obj = item.text
        }
        result = result.replace(reg, obj)
    })
    return result
    // return template.replace(/{大类替换符}/g, "{alarm_type}")
    //     .replace(/{小类替换符}/g, "{alarm_subset_type}")
    //     .replace(/{车牌号}/g, "{plate_num}")
    //     .replace(/{事件开始时间}/g, "{event_start_date}")
    //     .replace(/{当前道路限速值}/g, "{current_Road_Speed_Limit}");
}

defineExpose({ ...toRefs(state), setFormData })
</script>

<style scoped lang="scss">
.wildcard-item {
    border: 1px solid #ccc;
    color: #535353;
    margin: 10px 18px 10px 0px !important;
    padding: 0 6px;
    border-radius: 5px;
    cursor: pointer;
}
</style>
