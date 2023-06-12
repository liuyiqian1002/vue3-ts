<template>
    <div class="tw_clr">
        <h5 class="mb-2 p20 fs20 nowrap">道路运输安全第三方监测服务平台</h5>
        <div class="tw_cr">
            <el-menu
                id="menu-box"
                class="h border-no"
                background-color="#283059"
                text-color="#D9E6FE"
                active-text-color="#2AD4FF"
                :default-active="activeMenu"
                :ellipsis="false"
                :unique-opened="false"
                :mode="sidebarMode"
                @open="handleOpen"
                @close="handleClose"
            >
                <sidebar-item v-for="(route, index) in permission_routes" :key="index" :item="route"
                              :base-path="route.path"/>
    
            </el-menu>
            <span class="infomation tw_cl">
                <el-tooltip
                    effect="dark"
                    content="模式"
                    placement="bottom-start"
                >
                  <button @click="toggleDark()" class="border-none w-full bg-transparent cursor-pointer" style="height: var(--ep-menu-item-height);">换肤
        <i inline-flex i="dark:ep-moon ep-sunny" />
      </button>
                  </el-tooltip> <el-tooltip effect="dark" content="消息" placement="bottom-start" >
                    <el-icon :size="18" class="pointer mr20">
                        <svg-icon icon-class="xiaoxi"></svg-icon>
                    </el-icon>
                  </el-tooltip>
                
                <el-dropdown :tabindex="1" >
                    <div class="el-dropdown-link tw_cl">
                        <el-avatar size="small" :src="data.avatar ? data.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
                        <span class="userName ml5 line-block ellipsis ">{{ data.realName }}</span>
<!--                        <el-icon class="el-icon&#45;&#45;right">-->
<!--                            <arrow-down />-->
<!--                        </el-icon>-->
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>修改密码</el-dropdown-item>
                            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </span>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import SidebarItem from './SidebarItem.vue'
import { toggleDark } from '@/composables';
import { ArrowDown, Expand, Fold } from '@element-plus/icons-vue'

const $route = useRoute()
// 拿到store独享
const store = useStore()
const permission_routes = computed(() => store.state.menus.menus)
let data = computed(() => store.getters.users)
// $ref({
//     "avatar": "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
//     userName: '放得开'
// })
let { sidebarMode } = defineProps({
    sidebarMode: {type: String, default: 'vertical'}
})

// const isDark = useDark()
// const toggleDark = useToggle(isDark)

let activeMenu = computed(() => {
    const {meta, path} = useRoute()
    // if (path.indexOf(meta.activeMenu)) {
    //     return meta.activeMenu
    // }
    return path
})

const handleOpen = () => {

}

const logout = () => {
    store.dispatch('user/logout')
}
const handleClose = () => {

}

</script>
<style lang="scss" scoped>
#menu-box { width: 993px; overflow: hidden;}
.userName { color: #BDD4FE}
.infomation { padding: 10px 0 10px 20px}
</style>
