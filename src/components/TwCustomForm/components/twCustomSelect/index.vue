<template>
    <el-form-item :label="item.label" :prop="item.key">
        <OnClickOutside class="w" @trigger="close">
            <el-select class="tw_custom_select w" :popper-class="item.key" ref="selectRef"
                       v-model="formData[item.key]" :placeholder="item.placeholder" :multiple="item.multiple"
                       :collapse-tags="item.collapseTags!==false" collapse-tags-tooltip :clearable="item.clearable !== false"
                       :disabled="item.disabled" :filterable="item.remote" v-loadMore="loadNextData" :teleported="false"
                       :default-first-option="item.defaultFirstOption"
                       :remote="item.remote" remote-show-suffix
                       :allow-create="item.allowCreate"
                       :reserve-keyword="item.remote" :remote-method="remoteMethod" @change="selectChange"
                       @visible-change="getSelectOption($event, item)"
                       @blur="blurSelect"
                       @clear="clearKeyword">
                <template v-if="item.children">
                    <el-option
                        v-for="(tag, i) in item.children"
                        :key="i"
                        :label="tag[item.props?.label ?? 'label']"
                        :value="tag[item.props?.value ?? 'value']"
                    />
                </template>
            </el-select>
        </OnClickOutside>
    </el-form-item>
</template>

<script setup lang="ts">
import {commonApi} from "@/api/common";
import { OnClickOutside } from '@vueuse/components'
import {getCurrentInstance} from "vue";

let { proxy} = getCurrentInstance()
const {formData, item, lists} = defineProps({
    formData: Object,
    item: Object,
    lists: Array
})
let selectRef = $ref(null)
let loading = $ref(false)
let pageParams = {}

const close = () => {
    selectRef.blur()
}

if (item.filter) {
    item.children = proxy.$store.getters.arrEnumerate[item.filter]
} else if (item.children) {
    item.children = item.children
}
if (item.all) {
    item.children.unshift({ label: '全部', value: undefined })
}
// let lists = $ref([])
const remoteMethod = proxy.$_.debounce((query: string) => {
    if (!item.remote) return
    // if (query) {
        item.params.pageNumber = 1
        pageParams['keyword'] = query
        loadData()
    // }
    // else {
    //     item.children = []
    // }
},500)

const clearKeyword = ()=>{
    pageParams['keyword'] = ''
    loadData()
}
interface Res {
    rows?: Array<object>,
    list?: Array<object>,
}
const loadData = () => {
    if (item.url) {
        loading = true
        let params = {
            pageNumber: 1
        }
        if(item.params){
            params = item.params
        }
        if (params.pageNumber) {
            params.pageNumber = 1
        }
        params = {...pageParams, ...params}
        commonApi(item.url, params, item.method).then(res => {
            loading = false
            if (res && res instanceof Array) {
                item.children = res
            } else {
                let list = (res as unknown as Res).rows
                if ( list && list instanceof Array) {
                    item.children = list
                }
            }
            if (item.params.pageNumber) {
                item.params.pageNumber++
            }
    
            // 加载成功后事件回调
            if(item.loadData){
                item.loadData(res)
            }
        }).catch(() => {
            loading = false
        })
    }
}

const blurSelect = (val)=>{
    // setTimeout(()=>{
    //     selectRef.blur()
    // },10)
}

const getSelectOption = (pType)=>{
    if (pType) {
        // 远程搜索时控制icon样式
        // pObject.visibleChange = true
        if(!item.children){
            item.children = []
        }
        if(item.children.length == 0){
            loadData()
        }
    } else {
        // pObject.visibleChange = false
    }
}
loadData()


const loadNextData = () => {
    if (item.url && item.loadMore) {
        if (!loading) {
            loading = true
            let params = item.params || {}
            params = {...params, ...pageParams}
            commonApi(item.url, params, item.method).then(res => {
                loading = false
                item.params.pageNumber++
                if (res && res instanceof Array) {
                    item.children = [...item.children, ...res]
                } else {
                    let list = (res as unknown as Res).rows
                    if ( list && list instanceof Array) {
                        item.children = [...item.children, ...list]
                        console.info('res data is no Array, use res.rows')
                    }
                }
                // item.children = item.children.concat(res)
                
            }).catch(() => {
                loading = false
            })
        }
    }
}

let emits = defineEmits(['tapClick'])
const selectChange = (val) => {
    if (item.arrChangeKey) {
        item.arrChangeKey.forEach(key => {
            formData[key] = val
        })
        emits('tapClick', 'reset', item)
    }
    
    if(item.relyOnData){
        item.relyOnData.forEach(item=>{
            lists.forEach(tag=>{
                if(item.key == tag.key){
                    formData[tag.key] = ''
                    tag.params[item.value] = val
                    if((!item.clearChildren) || (item.clearChildren === true)){
                        tag.children = []
                    }
                }
            })
        })
    }
    
    if (item.change) {
        item.change(val, formData, item)
    }
    emits('tapClick', 'selectChange', {val, item, children: item.children})
}

const reset = () => {
    loadData()
}

defineExpose({reset, loadData, item})
// const emit = defineEmits(['update:name'])
</script>

<style scoped lang="scss">
.tw_custom_select {
    :deep(.el-select__tags) { flex-wrap: nowrap; white-space: nowrap;}
}
</style>


<!--<template>-->
<!--    <el-input v-model="name" />-->
<!--    {{name}}-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--const { name } =  defineProps({-->
<!--    name:String-->
<!--})-->
<!--console.log(name);-->

<!--const emit = defineEmits(['update:name'])-->
<!--</script>-->

<!--<style scoped lang="scss">-->

<!--</style>-->
