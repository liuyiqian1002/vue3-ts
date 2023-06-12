<template>
    <div class="tw_header">
        <div class="tw_clr">
            <div class="tw_cl">
                <img style="width: 34px;" :src="$store.getters.systemIcon" />
                <h1 class="login_title mb-2 p10 fs20 nowrap mt10" style="letter-spacing: 2px;font-family: 'douyuZt'">{{$store.getters.productPrimaryName}}</h1>
<!--                <h1 class="login_title mb-2 p10 fs20 nowrap mt10 overflow header_dt_title" style="letter-spacing: 2px;font-family: 'douyuZt'">兴山县兴发汽运有限公司</h1>-->
            </div>
            <!--        <h5 class="mb-2 p20 fs20 nowrap">道路运输安全第三方监测服务平台</h5>-->
            <div class="tw">
                <!--     菜单       -->
                <menus></menus>
            
                <span class="infomation overflow tw_cl">
                    <el-tooltip effect="dark" content="皮肤" placement="bottom-start">
                        <el-switch
                            v-model="switchCheck"
                            inline-prompt
                            active-icon="Moon"
                            inactive-icon="Sunny"
                            @change="toggleDark"
                            class="mr20 header_dt_icon"
                        />
                    </el-tooltip>
                    <el-tooltip effect="dark" content="搜索" placement="bottom-start">
                        <div class="mr20 pointer header_dt_icon" ref="buttonRef" v-click-outside="onClickOutside">
                            <svg-icon icon-class="sousuo" color="#fff"></svg-icon>
                         </div>
                        <!--                    <el-icon :size="18" class="pointer mr20"><Search /></el-icon>-->
                    </el-tooltip>
                    <el-tooltip effect="dark" content="消息" placement="bottom-start">
    <!--                     <el-badge v-show="true" :value="12" class="mr20 pointer">-->
                         <div class="mr20 pointer header_dt_icon">
                              <svg-icon @click="viewDate" icon-class="xiaoxi1" color="#fff"></svg-icon>
                         </div>
    <!--                     </el-badge>-->
                         <svg-icon v-show="false" @click="viewDate" icon-class="xiaoxi1" color="#fff"></svg-icon>
        
                         <!--                    <el-icon :size="18" class="pointer mr20"><Bell /></el-icon>-->
                    </el-tooltip>
                        <!--                -->
                    <el-tooltip v-if="$store.getters.permissions?.['index-message-dclb-xz']" effect="dark" content="导出" placement="bottom-start">
                         <div class="mr20 pointer header_dt_icon">
                            <svg-icon icon-class="daochu" @click="viewData" color="#fff"></svg-icon>
                         </div>
                         <!--                    <el-icon :size="18" class="pointer "><Download /></el-icon>-->
                    </el-tooltip>
                    
                    <el-dropdown :tabindex="1" >
                        <div class="el-dropdown-link pointer tw_cl">
                            <el-avatar size="small" :src="data.avatar ? data.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
                            <span class="userName ml5 line-block ellipsis ">{{ data.realName }}</span>
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
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
        <!-- 搜索 -->
        <el-popover
            ref="popoverRef"
            :virtual-ref="buttonRef"
            popper-class="head-seek"
            width="520px"
            trigger="click"
            :teleported="false"
            :show-arrow="false"
            placement="bottom-end"
            virtual-triggering
        >
            <div class="head-seek_content" :class="keyword == ''?'':'seek'">
                <el-input v-model="keyword" @change="seekRes" class="head-seek_content_input" placeholder="请输入你想搜索的菜单名称" input-style="color: #fff">
                    <template #prefix>
                        <svg-icon icon-class="sousuo" color="#fff"></svg-icon>
<!--                        <el-icon class="el-input__icon"><calendar /></el-icon>-->
                    </template>
                </el-input>
                <el-scrollbar style="height: 222px;overflow: auto">
                    <ul class="seek_content" v-loading="loading">
                        <li class="head-seek_content_li" @click="goPage(item)" v-for="(item, i) in seekLists" :key="i">
                            {{item.meta.title}}
                        </li>
                    </ul>
                    <div class="seek_lishi pt20">
                        <div class="seek_lishi_title tw_cl">
                            <svg-icon icon-class="lishijilu" size="16px" color="#fff"></svg-icon>
                            <p class="white pl10 fs16 fw700" style="font-family: '微软雅黑 Light'">搜索历史</p>
                        </div>
                        <router-link :to="tag.path" v-for="(tag, i) in cacheLists" :key="tag.path">
                            <el-tag :tabindex="i" size="large" class="seek_lishi_tag mr10 mt10 border-no white" style="background-color: #183A61;">
                                {{ tag.meta.title }}
                            </el-tag>
                        </router-link>
                        
                    </div>
                </el-scrollbar>
                
            </div>
        </el-popover>
        <!-- 导出列表组件 -->
        <derivelist ref="derivelistRef" ></derivelist>
        <!-- 消息列表列表组件 -->
        <messagelist ref="messagelistRef"></messagelist>
    </div>
    
</template>

<script setup lang="ts">
import { ClickOutside as vClickOutside } from 'element-plus'
import Menus from '../Menus/index.vue';
// 导出列表
import derivelist from './components/derivelist/index.vue';
// 消息列表
import  messagelist from './components/messagelist/index.vue';
import {useDark} from "@vueuse/core";
import {search} from "@/api/common";

let { proxy } = getCurrentInstance()
let title = $ref('')
// 拿到store独享
const derivelistRef = $ref(null)
const messagelistRef = $ref(null)

const store = useStore()
const viewData = ()=>{
    derivelistRef.viewData()
}
const viewDate = ()=>{
    messagelistRef.viewDate()
}
let data = computed(() => store.getters.users)

let switchCheck = $ref(useDark())
let emits = defineEmits(['updateDark'])
const toggleDark = ()=>{
    emits('updateDark', switchCheck)
    useToggle(useDark())
}

let keyword = $ref('')
let seekLists = $ref([])
const buttonRef = $ref()
const popoverRef = $ref()
const onClickOutside = () => {
    unref(popoverRef).popperRef?.delayHide?.()
    // search({keyword: keyword}).then(res=>{
    //     seekLists = res
    // })
}

let loading = $ref(false)
const seekRes = proxy.$_.debounce((val) => {
    loading = true
    search({keyword: keyword}).then(res=>{
        loading = false
        seekLists = res
    }).catch(()=>{
        loading = false
    })
})

let router = useRouter()
let cacheLists = $ref([])
let  cache = localStorage.getItem('cacheLists')
cacheLists = cache?JSON.parse(cache):[]
const goPage = (item) => {
    router.push(item.path)
    cacheLists = cacheLists.filter(tag=> tag.path != item.path)
    cacheLists.splice(0, 0, item)
    if(cacheLists.length> 5){
        cacheLists.splice(4,1)
    }
    localStorage.setItem('cacheLists', JSON.stringify(cacheLists))
}

let activeMenu = computed(() => {
    const {meta, path} = useRoute()
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
#menu-box { width: 993px;}
.userName { color: #BDD4FE}
.infomation { padding: 10px 0 10px 20px}
.tw_header {
    @media screen and (max-width: 1600px) {
        .header_dt_icon { display: none}
    }
    @media screen and (max-width: 1420px) {
        .header_dt_title { display: none}
    }
    :deep(.head-seek) {
        background: #1C213B; border: none;color: #fff;border-radius: 10px;
        .head-seek_content {
            background: rgba(24,58,97,0);
            width: 456px;height: 254px;border-radius: 10px;
            padding: 10px 20px 0;
            .seek_content {display: none;}
            .seek_lishi {display: block;}
            .head-seek_content_input {
                .el-input__wrapper { background: rgba(24,58,97,1);box-shadow: none; }
            }
            .head-seek_content_li {
                width: 408px;padding-left: 28px;line-height: 33px;cursor: pointer;border: 1px solid rgba(39,202,255,0);position: relative;margin-left: 10px;background-color: rgba(0,0,0,0);
                &:after { content: ''; width: 440px;border-radius: 6px;transition: 0.4s cubic-bezier(0.075, 0.82, 0.165, 1); height: 33px;position: absolute; left: -20px;top: 0;}
                &:hover {
                    &:after { left: 0px; border: 1px solid rgba(39,202,255,1);background: rgba(39,202,255,0.2);}
                }
            }
            .seek_lishi_tag {
                border-radius: 6px;
                //&:active { color: #27CAFF; border: 1px solid rgba(39,202,255,1);}
                &:focus { color: #27CAFF; border: 1px solid rgba(39,202,255,1);}
            }
        }
        .seek {
            background: rgba(24,58,97,1);
            .seek_content {display: block;}
            .seek_lishi {display: none;}
            .head-seek_content_input {
                .el-input__wrapper { background-color: rgba(0,0,0,0); box-shadow: none; }
            }
        }
    }
}
</style>
