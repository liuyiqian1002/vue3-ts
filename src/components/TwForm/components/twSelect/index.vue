<template>
    <el-form-item :label="item.label" :prop="item.key">
        <el-select
            class="w"
            :popper-class="item.key"
            v-model="formData[item.key]"
            :placeholder="item.placeholder"
            :multiple="item.multiple"
            :collapse-tags="item.collapseTags !== false"
            :clearable="item.clearable !== false"
            :disabled="item.disabled"
            :filterable="item.remote"
            v-loadMore="loadNextData"
            :teleported="false"
            :remote="item.remote"
            remote-show-suffix
            :reserve-keyword="item.remote"
            :remote-method="remoteMethod"
            @change="selectChange"
            @clear="clearKeyword"
        >
            <template v-if="item.children">
                <el-option v-for="(tag, i) in item.children" :key="i" :label="tag[item.props?.label ?? 'label']"
                           :value="tag[item.props?.value ?? 'value']"/>
            </template>
        </el-select>
    </el-form-item>
</template>

<script setup lang="ts">
import {commonApi} from '@/api/common'

let {proxy} = getCurrentInstance()

interface Params {
    pageNumber?: number
}

interface Props {
    label?: string
    value?: string
}

interface Item {
    label: string
    key: string
    placeholder: string
    multiple: boolean
    remote: boolean
    collapseTags: boolean
    loadMore: boolean
    filter: string
    pageNumber: number
    method: string
    url: string
    props: Props
    params: Params
    children: Array<object>
    all: boolean
    clearable: boolean
    disabled: boolean
    arrChangeKey: Array<string>
    change: Function
}

const {formData, item} = defineProps<{
    formData: Object
    item: Partial<Item>
}>()
let loading = $ref(false)
let pageParams = {}
// let lists = $ref([])

// options选项列表
// let options = $ref([])

if (item.filter) {
    item.children = proxy.$store.getters.arrEnumerate[item.filter]
} else if (item.children) {
    item.children = item.children
}
if (item.all) {
    if (item.children[0].label !== '全部') {
        item.children.unshift({label: '全部', value: undefined})
    }
}

const remoteMethod = proxy.$_.debounce((query: string) => {
    if (!item.remote) return
    if(item.multiple || query){
        item.params.pageNumber = 1
        pageParams['keyword'] = query
        loadData()
    }
    // if (query) {
    // }
    // else {
    //     item.children = []
    // }
},500)

const clearKeyword = () => {
    pageParams['keyword'] = ''
    loadData()
}

interface Res {
    rows?: Array<object>
    list?: Array<object>
}

const loadData = () => {
    if (item.url) {
        loading = true
        let params: Params = {}
        if (item.params) {
            params = item.params
        }
        if (params.pageNumber) {
            params.pageNumber = 1
        }
        params = {...params, ...pageParams}
        commonApi(item.url, params, item.method).then((res) => {
            loading = false
            if (res && res instanceof Array) {
                item.children = res
            } else {
                let list = (res as unknown as Res).rows
                if (list && list instanceof Array) {
                    item.children = list
                }
            }
            if (item.params.pageNumber) {
                item.params.pageNumber++
            }
            // 加载成功后事件回调
            if (item.loadData) {
                item.loadData(res)
            }
        }).catch(() => {
            loading = false
        })
    }
}
loadData()

const loadNextData = () => {
    if (item.url && item.loadMore) {
        if (!loading) {
            loading = true
            let params = item.params || {}
            params = {...params, ...pageParams}
            commonApi(item.url, params, item.method)
                .then((res) => {
                    loading = false
                    if (item.params.pageNumber) {
                        item.params.pageNumber++
                    }
                    if (res && res instanceof Array) {
                        item.children = [...item.children, ...res]
                    } else {
                        let list = (res as unknown as Res).rows
                        if (list && list instanceof Array) {
                            item.children = [...item.children, ...list]
                            console.info('res data is no Array, use res.rows')
                        }
                    }
                    // item.children = item.children.concat(res)
                })
                .catch(() => {
                    loading = false
                })
        }
    }
}

let emits = defineEmits(['tapClick'])
const selectChange = (val) => {
    if (item.arrChangeKey) {
        item.arrChangeKey.forEach((key) => {
            formData[key] = val
        })
        emits('tapClick', 'reset', item)
    }
    if (item.change) {
        item.change(val, formData, item)
        // TODO 这里需要将整个字段传过去
    }
    emits('tapClick', 'selectChange', {val, item, children: item.children})
}

const reset = () => {
    loadData()
}

defineExpose({reset, item})
// const emit = defineEmits(['update:name'])
</script>

<style scoped lang="scss"></style>

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
