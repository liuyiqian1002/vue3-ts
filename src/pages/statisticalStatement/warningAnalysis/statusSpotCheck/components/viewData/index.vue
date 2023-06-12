<template xmlns="http://www.w3.org/1999/html">
    <div>
        <tw-dialog :title="title" width="720px" v-model="drawerFlag">
            <el-row :gutter="30">
                <el-col :span="12" class="tw_cy" v-for="(item, i) in mainData.formData.photoDtos" :key="i">
                    <div class="w300 sbox_shadow b_radius mb20">
                        <el-image class="w b_radius" style="height: 300px" :src="item.illegalPhoto" :preview-src-list="srcLists" :initial-index="i" hide-on-click-modal></el-image>
                        <p class="pl10 lh20">违规速度:{{item.illegalSpeed}}<br/> 违规描述:{{item.illegalDescribe}} <br/>违规时间：{{item.illegalTime}}</p>
                    </div>
                </el-col>
            </el-row>
            
        </tw-dialog>
    </div>
</template>

<script setup lang="tsx">
import { getCurrentInstance, reactive } from 'vue'
import {exportVehicleList} from "@/api/statisticalStatement/fiveFactorAnalysis/carUpOnlineSituationStatistics";


let {proxy} = getCurrentInstance()
let mainTable = $ref(null)
defineProps({
    title: String,
})

let mainData = reactive({
    formData: {},
})
let drawerFlag = $ref(false)
let src = $ref('')
let srcLists = $ref([])
let srcIndex = $ref(0)
const viewData = (row) => {
    mainData.formData = { ...mainData.formData, ...row}
    srcLists = proxy.$_.map(mainData.formData.photoDtos, 'illegalPhoto')
    // mainData.formData.illegalPhotos = mainData.formData.illegalPhotos.split('|')
    src = srcLists[0]
    drawerFlag = true
}

const switchImg = (val) => {
    srcIndex = val
}

defineExpose({ viewData })

const handleClose = () => {
    // dataLists = []
}
</script>

<style scoped lang="scss">
</style>
