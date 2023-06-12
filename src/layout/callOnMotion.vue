<template>
    <el-container class="w h pl0">
        <el-main class="h p0 overflow">
            <router-view v-slot="{ Component }">
                <transition name="fade-transform" mode="out-in" appear>
                    <keep-alive>
                        <component ref="callOnMotionRef" style="height: calc(100% - 38px)" :is="Component"/>
                    </keep-alive>
                </transition>
            </router-view>
        </el-main>
    
        <!--    右下角报警提示    -->
        <callPolice :props="{value: 'vehicleCode', label: 'plateNum' }" ref="callPoliceRef" @takeMsg="takeMsg"></callPolice>
    </el-container>
</template>

<script setup lang="tsx">
import callPolice from "./components/callPolice/index.vue"

let callOnMotionRef = $ref(null)
let callPoliceRef = $ref(null)
setTimeout(()=>{
    if(!callPoliceRef) return
    callPoliceRef.viewData()
}, 1000)

const takeMsg = (data) => {
    if(callOnMotionRef.takeMsg){
        callOnMotionRef.takeMsg(data)
    }
}
</script>

<style lang="scss" scoped>

</style>
