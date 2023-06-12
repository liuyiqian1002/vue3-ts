<template>
    <el-tabs v-model="activeName">
           <el-tab-pane label="TTS语音" name="first">
             <ttsvoice ref="videoconfigRef"></ttsvoice>
           </el-tab-pane>
           <el-tab-pane label="短信" name="second">
             <note ref="systemRef"></note>
           </el-tab-pane>
       </el-tabs>
</template>

<script setup lang="tsx">
import ttsvoice from "./ttsvoice/index.vue"
import note from "./note/index.vue"
const activeName = ref('first')
</script>

<style scoped lang="scss">
:deep(.el-tabs__nav-scroll){
    padding-left: 1%;
}
</style>