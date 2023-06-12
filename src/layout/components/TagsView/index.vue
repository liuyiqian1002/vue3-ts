<template>
    <div class="tags-view-container relative" id="tags-view-container" ref="tagsView">
        <el-scrollbar @scroll="handleScroll" class="tags-view-wrapper" ref="scrollPaneRef">
            <div class="tags-view-wrapper tw_cl" ref="tagsContent">
                <template v-for="(tag,i) in visitedViews" :key="tag.path">
    <!--                :class="isActive(tag) ? 'active' : ''"-->
                    <router-link
                        :style="activeStyle(tag,i)"
                        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                        class="tags-view-item transition"
                        tag="span"
                        ref="tags"
                        @contextmenu.prevent.native="openMenu(tag,$event, i)"
                    >
                        <el-tag class="mr5" :class="isActive(tag)?'activeTag':''" :closable="!tag.meta.affix" @close.prevent="closeSelectedTag(tag)">{{ tag.title }}</el-tag>
                    </router-link>
                </template>
            </div>
            
        </el-scrollbar>
        <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" style="z-index: 22" class="contextmenu">
            <!--            <li @click="refreshSelectedTag(selectedTag)">Refresh</li>-->
            <!--            <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">Close</li>-->
            <li @click="closeOthersTags">关闭其它</li>
            <li @click="closeAllTags(selectedTag)">关闭所有</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import ScrollPane from './ScrollPane.vue'
    // @ts-ignore
    import path from 'path-browserify'
    // @ts-ignore
    import router from "@/router";
    import {nextTick, onMounted} from "@vue/runtime-core";

    const { affixTags, tagsView } = reactive({
        affixTags: [],
        tagsView: null,
   })

    const store = useStore()
    const $router = useRoute()
    const routerObj = useRouter()
    let left = $ref(0)
    let top = $ref(0)
    let visible = $ref(false)
    let selectedTag = $ref({})
    let tags = $ref(null)
    let tagsContent = $ref(null)
    let scrollPaneRef = $ref(null)
    

    // 跳转监听
    // 路由监听如果使用 onBeforeRouteUpdate或onBeforeRouteLeave 会有监听不到的情况
    router.beforeEach((to: any)=>{
        console.log(to);
        addTags(to)
    })

    const handleScroll = () => {
    
    }

    const visitedViews = computed(()=> {
        let navs = store.state.tagsView.visitedViews
        return navs
    })

    const routes = computed(()=> {
        return store.state.permission.routes
    })

    const theme = computed(()=> {
        return store.state.settings.theme
    })

    onMounted(()=>{
        initTags()
        // @ts-ignore
        addTags()
    })

    const isActive = (route: any)=> {
        return route.path === $router.path
    }
    const activeStyle = (tag: any, i: number)=> {
        return {
            'background-color': theme,
            'border-color': theme,
            'z-index': visitedViews.length - i
        }
    }

    const filterAffixTags = ({routes, basePath = '/'}: { routes: any, basePath?: string })=> {
        let tags: any[] = []
        routes.forEach((route: any) => {
            // if (route.meta && route.meta.affix) {
            if (route.meta.title == '首页概况') {
                const tagPath = path.resolve(basePath, route.path)
                tags.push({
                    fullPath: tagPath,
                    path: tagPath,
                    name: '首页',
                    meta: {title: '首页', icon: 'shouye', affix: true}
                })
            }
            if (route.children) {
                const tempTags = filterAffixTags({routes: route.children, basePath: route.path})
                if (tempTags.length >= 1) {
                    tags = [...tags, ...tempTags]
                }
            }
        })
        // return tags
        return [{
            fullPath: '/',
            path: '/',
            name: '首页',
            meta: {title: '首页', icon: 'shouye', affix: true}
        }]
    }
    const initTags = ()=> {
        const affixTags = filterAffixTags({routes: store.state.menus.menus})
        for (const tag of affixTags) {
            // Must have tag name
            if (tag.meta.title) {
                store.dispatch('tagsView/addVisitedView', tag)
            }
        }
    }
    const addTags = (to: any)=> {
        let route = to ? to : $router
        const {name} = route
        if (name) {
            store.dispatch('tagsView/addView', route)
        }
        if(scrollPaneRef)
        scrollPaneRef!.setScrollLeft(tagsContent!.clientWidth)
        
        return false
    }

    const closeSelectedTag = (view: any)=> {
        store.dispatch('tagsView/delView', view).then(({visitedViews}) => {
            if (isActive(view)) {
                toLastView({visitedViews: visitedViews, view: view})
            }
        })
    }
    const closeOthersTags = ()=> {
        routerObj.push(selectedTag)
        store.dispatch('tagsView/delOthersViews', selectedTag).then(() => {
            moveToCurrentTag()
        })
    }

    const moveToCurrentTag = ()=> {
        nextTick(() => {
            for (const tag of tags) {
                if (tag.to.path === routerObj.path) {
                    // this.$refs.scrollPane.moveToTarget(tag)
                    // when query is different then update
                    if (tag.to.fullPath !== routerObj.fullPath) {
                        store.dispatch('tagsView/updateVisitedView', routerObj)
                    }
                    break
                }
            }
        })
    }
    
    const closeAllTags = ({view}: { view: any })=> {
        store.dispatch('tagsView/delAllViews').then(({visitedViews}) => {
            if (affixTags.some(({tag}: { tag: any }) => tag.path === view.path)) {
                return
            }
            toLastView({visitedViews: visitedViews, view: view || {}})
        })
    }

    const toLastView = ({visitedViews, view}: { visitedViews: any, view: any })=> {
        const latestView = visitedViews.slice(-1)[0]
        if (latestView) {
            routerObj.push(latestView.fullPath)
        } else {
            // 现在默认是重定向到主页，如果没有标签视图，
            // 你可以根据你的需要进行调整。
            if (view.name === '/') {
                // to reload home page
                routerObj.replace({path: '/redirect' + view.fullPath})
            } else {
                routerObj.push('/')
            }
        }
    }
    const openMenu = (tag, e, i)=> {tags
        const menuMinWidth = 105
        // const offsetLeft = e.srcElement.x // container margin left
        const offsetLeft = tags[i].$el.getBoundingClientRect().left
        const offsetWidth = tags[i].$el.offsetWidth // container width
        const maxLeft = offsetWidth - menuMinWidth // left boundary
        const tleft = e.clientX - offsetLeft + 15 // 15: margin right
    
        left = offsetLeft
    
        top = e.clientY - 50
        visible = true
        selectedTag = tag
    }

    const closeMenu = ()=> {
        visible = false
    }
    
    watch(()=>visible,(value)=> {
        if (value) {
            document.body.addEventListener('click', closeMenu)
        } else {
            document.body.removeEventListener('click', closeMenu)
        }
    } )
    
</script>
<!--suppress CssInvalidPseudoSelector -->
<style lang="scss" scoped>
.tags-view-container {
    min-height: 38px;height: 38px;width: 100%;background: var(--tw-tag-bg-color);
    .tags-view-wrapper {
        height: 38px;white-space: nowrap;flex-wrap: nowrap;
        //.tags-view-item {
        //    &:first-of-type {
        //        margin-left: 0; margin-left: 20px;
        //    }
        //}
        :deep(.el-tag) {
            color: var(--el-text-color-primary);background: var(--tw-tag-bg-color);border: none;font-size: 16px;height: 38px;padding: 0 16px;
            .el-tag__close { color: var(--el-text-color-primary);font-size: 16px;width: 16px;height: 16px;margin-left: 10px}
        }
        .activeTag {
            color: var(--el-tag-text-color); background: var(--el-bg-color);
            :deep(.el-tag__close) { color: var(--el-tag-text-color);}
            :deep(.el-tag__close:hover) { background: var(--el-color-primary-light-9);color: var(--el-tag-text-color);}
        }
        //.activeTag {
        //    background: var(--el-tag-text-color); color: var(--el-color-primary-light-9);
        //    :deep(.el-tag__close) { color: var(--el-color-primary-light-9);}
        //    :deep(.el-tag__close:hover) { background: var(--el-color-primary-light-9);color: var(--el-tag-text-color);}
        //}
    }
    
    .contextmenu {
        margin: 0;
        background: #fff;
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;
            &:hover {
                background: #eee;
            }
        }
    }
}

</style>
