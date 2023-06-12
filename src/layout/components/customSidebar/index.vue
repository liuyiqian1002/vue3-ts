<template>
    <div class="siderbar_box-shadow relative h">
        <div class="bgWhite border-b siderbar_box-shadow tw_cr pr20" style="height: 40px">
            <el-icon class="pointer transition" @click="isCollapse = !isCollapse" size="26px" :style="`transform: rotate( ${isCollapse? 180 : 0}deg)`"><Fold  /></el-icon>
        </div>
        <div id="customSidebar" class="tw_cr h">
<!--            :default-openeds="activeMenu"-->
            <el-menu
                default-active="2"
                class="h el-menu-vertical-demo border-no"
                :default-active="activeMenu"
                :collapse="isCollapse"
                :unique-opened="true"
                @open="handleOpen"
                @close="handleClose"
            >
                <sidebar-item v-for="(route, index) in lists" :key="route.id" :item="route"
                              :base-path="route.path"/>
    
            </el-menu>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import {Expand, Fold} from '@element-plus/icons-vue'
import SidebarItem from '../Sidebar/SidebarItem.vue'
import {useStore} from "vuex";

const isCollapse = ref(false)

let store = useStore()
let lists = computed(()=> store.state.menus.systemMenus)
let activeMenu = computed(() => {
    const {meta, path} = useRoute()
    if (meta.activeMenu) {
        return meta.activeMenu
    }
    return path || ''
})

const handleOpen = () => {

}

const handleClose = () => {

}


</script>
<style lang="scss" scoped>
.siderbar_box-shadow { box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.0784313725490196); z-index: 99}
#customSidebar { background: #fff;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
    }
}
</style>
