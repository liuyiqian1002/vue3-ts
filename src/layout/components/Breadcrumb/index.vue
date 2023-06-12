<template>
    <el-breadcrumb class="app-breadcrumb pl20" :separator-icon="ArrowRight" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in lists" :key="index + '@'">
                <span class="no-redirect tw_cl" :class="{ last: index == lists.length - 1 }"> <svg-icon :icon-class="item.meta.icon || ''"></svg-icon> {{ item.meta.title }}</span>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import {ArrowRight} from '@element-plus/icons-vue'

const route = useRoute()
let lists = $ref([])
console.log(route);
lists = route.matched
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 16px;
    line-height: 40px;
    background: #fff;
    width: 100%;
    
    .no-redirect {
        color: #cccccc;
        cursor: text;
    }
    
    .last {
        color: #31c0fd;
    }
    
    .txt {
        color: #cccccc;
    }
}
</style>
