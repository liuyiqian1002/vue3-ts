<template>
        <template  v-if="hasOneShowingChild(props.item.children,props.item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
            <router-link v-if="onlyOneChild.meta" :to="onlyOneChild.path">
<!--                :class="{'submenu-title-noDropdown':!props.isNest}"-->
                <el-menu-item :index="resolvePath(onlyOneChild.path)">
                    <svg-icon :icon-class="onlyOneChild.meta.icon||(props.item.meta&&props.item.meta.icon) || ''" ></svg-icon>
                    <template #title>
                        {{onlyOneChild.meta.title}}
                    </template>
                </el-menu-item>
            </router-link>
        </template>

        <el-sub-menu v-else ref="subMenu" :index="resolvePath(props.item.path)" popper-append-to-body>
            <template #title>
                <svg-icon :icon-class="props.item.meta && props.item.meta.icon || ''" >{{props.item.meta.title}}</svg-icon>
            </template>
            <el-menu-item-group>
<!--                <template #title><span>{{props.item.meta.title}}</span></template>-->
                <sidebar-item
                    v-for="(child, i) in props.item.children"
                    :key="i"
                    :item="child"
                    :base-path="resolvePath(child.path)"
                />
            </el-menu-item-group>
        </el-sub-menu>
</template>

<script setup lang="ts">
import SidebarItem from './SidebarItem.vue'
import path from 'path-browserify'
import { isExternal } from '@/utils/validate'
import Item from './Item.vue'
let onlyOneChild = $ref({})
type validteSlidebarItem = {
    item:  Object,
    // isNest: Boolean,
    basePath: String,
}
let props = defineProps<validteSlidebarItem>()
const hasOneShowingChild = (children =[], parent)=>  {
    const showingChildren = children.filter(item => {
        if (item.hidden) {
            return false
        } else {
            onlyOneChild = item
            return true
        }
    })
    
    // 当只有一个子路由器时，默认情况下会显示该子路由器
    if (showingChildren.length === 1) {
        return true
    }
    
    // 如果没有子路由器要显示，就显示父级
    if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, noShowingChildren: true }
        return true
    }
    // console.log(showingChildren);
    
    return false
}


const resolvePath = (routePath)=> {
    if (isExternal(routePath)) {
        return routePath
    }
    if (isExternal(props.basePath)) {
        return props.basePath
    }
    return path.resolve(props.basePath, routePath)
}
</script>
<style lang="scss" scoped>


</style>
