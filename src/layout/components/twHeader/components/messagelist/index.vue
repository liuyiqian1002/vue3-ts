<template>
    <div>
        <tw-dialog title="消息列表" v-model="drawerFlag">
            <el-tabs v-if="drawerFlag" v-model="activeName">
                <el-tab-pane label="公告消息" name="first" lazy>
                  <affiche ref="afficheRef"></affiche>
                </el-tab-pane>
                <el-tab-pane label="系统消息" name="second" lazy>
                  <system ref="systemRef"></system>
                </el-tab-pane>
                <el-tab-pane label="抄告消息" name="third" lazy>
                  <report ref="reportRef"></report>
                </el-tab-pane>
            </el-tabs>
        </tw-dialog>
    </div>
</template>
<script setup lang="ts">
// 公告消息组件引入
import affiche from './affiche/index.vue'
// 系统消息组件引入
import system from './system/index.vue'
// 抄告消息组件引入
import report from './report/index.vue'


defineProps({
    title: String,
})

const afficheRef = $ref(null)
const systemRef = $ref(null)
const reportRef = $ref(null)

const activeName = ref('first')
let drawerFlag = $ref(false)
const viewDate = (row) => {
    drawerFlag = true
}
defineExpose({ viewDate })
</script>

<style scoped lang="scss">
</style>
