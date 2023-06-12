<template>
    <el-breadcrumb class="app-breadcrumb" v-if="permission_routes.length > 0" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in levelList" :key="index + '@'">
                <span class="txt">{{  item.meta.title }}</span>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script>
import * as pathToRegexp from 'path-to-regexp'
import {mapState} from 'vuex'
import {computed, getCurrentInstance} from '@vue/runtime-core'

export default {
    data() {
        return {
            levelList: null,
            /** 是否开启个性化面包屑导航 */
            isOpenCustomBreadcrumb: true,
        }
    },
    setup(props, context) {
        let {proxy} = getCurrentInstance()
        
        const permission_routes = computed(() => {
            return proxy.$store.getters.permission_routes
        })
        const getTitle = computed(() => {
            return proxy.store.getters.user.isSetPassword == 1 ? '修改密码' : '设置密码'
        })
        return {permission_routes, getTitle}
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        },
        storeCustomBreadcrumb(nowValue, oldValue) {
            if (!this.isOpenCustomBreadcrumb) return
            const newTitle = nowValue[nowValue.length - 1].title
            this.levelList[this.levelList.length - 1].meta.title = newTitle
        },
        bulkImportBreadcrumb(nowValue, oldValue) {
            if (!this.isOpenCustomBreadcrumb) return
            this.getBreadcrumb()
        },
    },
    computed: {
        ...mapState('app', {
            storeCustomBreadcrumb: (store) => store.customBreadcrumb,
            bulkImportBreadcrumb: (store) => store.bulkImportBreadcrumb,
        }),
    },
    created() {
        this.getBreadcrumb()
    },
    methods: {
        getBreadcrumb() {
            // only show routes with meta.title
            let matched = this.$route.matched.filter((item) => item.meta && item.meta.title)
            const first = matched[0]
            
            if (!this.isDashboard(first)) {
                matched = [].concat(matched)
            }
            // ====================
            // 自定义面包屑导航
            // ====================
            const customBreadcrumb = 'customBreadcrumb'
            if(matched[matched.length - 1]){
                if (this.isOpenCustomBreadcrumb && typeof matched[matched.length - 1].meta[customBreadcrumb] !== 'undefined') {
                    const nowPageMatched = matched[matched.length - 1]
                    this.levelList = this.formateToRoute(
                        nowPageMatched.meta[customBreadcrumb].concat([
                            {
                                path: nowPageMatched.path,
                                title: nowPageMatched.meta.title || '',
                                redirect: false,
                            },
                        ])
                    )
                    return
                }
            }
            
            this.levelList = matched.filter(
                (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
            )
        },
        isDashboard(route) {
            const name = route && route.name
            if (!name) {
                return false
            }
            return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
        },
        pathCompile(path) {
            // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
            const {params} = this.$route
            var toPath = pathToRegexp.compile(path)
            return toPath(params)
        },
        handleLink(item) {
            const {redirect, path} = item
            if (redirect) {
                this.$router.push(redirect)
                return
            }
            this.$router.push(this.pathCompile(path))
        },
        formateToRoute(sourceArr, keyMap = {path: 'path', title: 'title'}) {
            const cloneArr = JSON.parse(JSON.stringify(sourceArr))
            const resArr = []
            cloneArr.map((i) => {
                const item = {
                    path: '',
                    name: i[keyMap.title] || '',
                    redirect: i.redirect ? i[keyMap.path] : 'noRedirect',
                    meta: {
                        icon: '',
                        title: '',
                    },
                }
                if (i[keyMap.path]) item.path = i[keyMap.path]
                if (i[keyMap.title]) item.meta.title = i[keyMap.title]
                resArr.push(item)
            })
            return resArr
        },
    },
}
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 16px;
    line-height: 64px;
    
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
