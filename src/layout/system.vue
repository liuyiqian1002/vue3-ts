<template>
    <el-container class="w h pl0">

<!--        <customSidebar></customSidebar>-->
<!--        &lt;!&ndash;      显示内容      &ndash;&gt;-->
        <el-main class="h p0 overflow">
<!--            <Breadcrumb></Breadcrumb>-->
            <TagsView v-show="getRouter?.meta?.tagview !== false"></TagsView>
            <router-view v-slot="{ Component }">
                <transition name="fade-transform" mode="out-in" appear>
                    <keep-alive>
                        <component style="height: calc(100% - 38px)" :is="Component"/>
                    </keep-alive>
                </transition>
            </router-view>
        </el-main>
    </el-container>
</template>


<script setup lang="ts">
import customSidebar from "./components/customSidebar/index.vue"
import Breadcrumb from "./components/Breadcrumb/index.vue"
import TagsView from "./components/TagsView/index.vue"

const route = useRoute()
const getRouter = computed(() => route)

</script>
<style lang="scss" scoped>

</style>
