<template>
    <div class="set-col">
        <tw-dialog title="视频标记" width="700px" v-model="dialogFlag">
            <tw-custom-form
                ref="fromDataRef"
                class="w500"
                :lists="mainData.lists"
                :formData="mainData.formData"
                showBtns
            >
                <template #frontImageUrl>
                    <upload v-model="mainData.formData.frontImageUrl" v-model:id="mainData.formData.frontFileId" uploadTxt="上传照片"></upload>
                </template>
                <template #content>
                    <el-checkbox-group v-model="mainData.formData.arr">
                        <transition name="fade-transform" mode="out-in">
                            <el-row v-if="mainData.formData.status == 1">
                                <el-col :span="12" v-for="(item, i) in mainData.spLists" :key="i"><el-checkbox :abel="item.value">{{item.label}}</el-checkbox></el-col>
                            </el-row>
                            <el-row v-else>
                                <el-col :span="12" v-for="(item, i) in mainData.sjLists" :key="i"><el-checkbox :abel="item.value">{{item.label}}</el-checkbox></el-col>
                            </el-row>
                        </transition>
                    </el-checkbox-group>
                    
                </template>
            </tw-custom-form>
        </tw-dialog>
    </div>
</template>

<script setup lang="tsx">


let {formData } = defineProps({
    formData: { type: Object, default: ()=>{} }
})


const mainData = reactive({
    spLists: [
        {label: '视频情况', value: 1},
        {label: '视频信息', value: 2},
        {label: '摄像头数量', value: 3},
        {label: '摄像头故障', value: 4},
        {label: '摄像头角度', value: 5},
        {label: '语音提醒', value: 6},
        {label: '报警附件', value: 7},
        {label: '其它', value: 8},
    ],
    sjLists: [
        {label: '抽烟', value: 1},
        {label: '疲劳', value: 2},
        {label: '打电话', value: 3},
        {label: '使用手机', value: 4},
        {label: '未系安全带', value: 5},
        {label: '聊天', value: 6},
        {label: '无押运员', value: 7},
        {label: '其它', value: 8},
    ],
    formData: {
        keyword: '',
        frontImageUrl: '',
        frontFileId: '',
        status: 1,
        arr: []
    },
    lists: [
        { key: 'frontImageUrl', col:24, label: '上传照片', slot: true},
        { key: 'title', col:24, label: '车牌号', disabled: true },
        { key: 'noticeType',type:'date', label: '卫星时间', placeholder: '卫星时间', col:24 },
        { key: 'status', type:'select', col:24, label: '标记类型', children: [{ label: '视频抽查', value: 1 }, { label: '司机违规', value: 0 }] },
        { key: 'content', col:24, label: '标记内容', slot: true },
        { key: 'noticeType', label: '当前速度', col:24 },
        { key: 'noticeType', label: '标记说明', col:24 },
    ],
})
let dialogFlag = $ref(false)

const viewData = ()=>{
    dialogFlag = true
}



let emits = defineEmits(['save'])
const save = ()=>{
    emits('save', [])
}



defineExpose({viewData})
</script>

<style scoped>

</style>
