<template>
    <div id="head_menus">
<!--        <ul class="tw_cl">-->
<!--            <li class="menu" v-for="(item, i) in permission_routes" :key="i">-->
<!--                <span class="menu"></span>-->
<!--            </li>-->
<!--        </ul>-->
        <ul role="menubar" class="el-menu el-menu--horizontal h border-no" id="menu-box" data-v-33ec43fc=""
            style="--el-menu-text-color:#D9E6FE; --el-menu-hover-text-color:#D9E6FE; --el-menu-bg-color:#283059; --el-menu-hover-bg-color:rgb(32, 38, 71); --el-menu-active-color:#2AD4FF; --el-menu-level:0;">
            <li v-for="(item, i) in permission_routes" :key="i" class="el-sub-menu" role="menuitem"
                :tabindex="i">
                <template v-if="item.children.length==0">
                    <router-link :to="item.path">
                        <div class="el-sub-menu__title el-tooltip__trigger el-tooltip__trigger" :class="route.path == '/'?'active':''"
                             style="border-bottom-color: transparent; color: rgb(217, 230, 254); background-color: rgb(40, 48, 89);">
                            <svg-icon class-name="svgicon-icon" :icon-class="item.meta.icon|| ''"></svg-icon>
                            <span class="svgicon-txt" style="--c8a70580-props_size:20px;">{{ item.meta.title }}</span>
                        </div>
                    </router-link>
                </template>
                <el-popover
                    v-else
                    :width="item.children.length<6?item.meta.title == '动态监测'? 220: item.children.length*180+40: 1300"
                    trigger="hover"
                    popper-class="app-head-popper"
                    propper-style="z-index: 99999999"
                    :hide-after="0"
                    :offset="0"
                >
                    <template #reference>
<!--                        <router-link :to="item.path">-->
                            <div class="el-sub-menu__title el-tooltip__trigger el-tooltip__trigger pr10"
                                 style="border-bottom-color: transparent; color: rgb(217, 230, 254); background-color: rgb(40, 48, 89);cursor: default" :class="isActive(item)?'active':''">
                                <svg-icon class-name="svgicon-icon" :icon-class="item.meta.icon|| ''" color="#fff"></svg-icon>
                                <span class="svgicon-txt" style="--c8a70580-props_size:20px;cursor: default">{{ item.meta.title }}</span>
                                <el-icon class="svgicon-icon"><ArrowDown /></el-icon>
                            </div>
<!--                        </router-link>-->
                    </template>
                    <el-scrollbar>
                        <ul class="menu_content tw">
                            <template v-for="(menu, j) in item.children" :key="j">
                                <template  v-if="['动态监测', '大屏动态'].includes(item.meta.title)">
                                    <router-link class="w" :to="menu.path">
                                        <div class="menu_content_item_title lh32 tw_cl pb5">
                                            <span class="ml10">{{menu.meta.title}}</span>
                                        </div>
                                    </router-link><br/>
                                </template>
                               
                                <li v-else class="menu_content_item pb30" :tabindex="j">
                                    <span class="menu_content_item_title tw_cl pb5"><svg-icon :icon-class="menu.meta.icon|| ''" color="#fff"></svg-icon><span class="ml10" style="cursor: default">{{menu.meta.title}}</span></span>
                                    <ul class="menu_content_navs">
<!--                                        <router-link :to="nav.path" v-for="(nav, n) in menu.children" :key="n">-->
<!--                                            <li class="menu_content_nav pointer fs14" :tabindex="n">{{nav.meta.title}}</li>-->
<!--                                        </router-link>-->
                                        <li @click="goPage(nav)" v-for="(nav, n) in menu.children" :key="n" class="menu_content_nav pointer fs14" :tabindex="n">{{nav.meta.title}}</li>
                                    </ul>
                                </li>
                            </template>
                            
                        </ul>
                    </el-scrollbar>
                </el-popover>
                
                
                
            </li>
           
        </ul>
    </div>
</template>

<script setup lang="ts">

// 拿到store独享
const store = useStore()
const permission_routes = computed(() => store.state.menus.menus)

const route = useRoute()
const router = useRouter()
let lists = $ref([])
lists = route.matched

const isActive = (item) => {
    // console.log(item.path);
    // console.log(route.path);
    // console.log(route.path.indexOf(item.path));
    return item.path == route.path || route.path.indexOf(item.path)>-1
}

const goPage = (item) => {
    store.dispatch('menus/setMeta', item.meta)
    console.log(item.path);
    router.push(item.path)
    return true
}

</script>

<style lang="scss" scoped>
.menu_content {
    padding: 8px;
    .menu_content_item {
        width: 180px;
        .menu_content_item_title { font-size: 16px;}
        .menu_content_nav { line-height: 33px; color: var(--el-text-color-regular);}
    }
    
}
//.el-menu--horizontal>.el-sub-menu{
//    .active{
//        background: rebeccapurple;
//        .svgicon-icon, .svgicon-txt {color: #26C9FF}
//    }
//}
</style>
