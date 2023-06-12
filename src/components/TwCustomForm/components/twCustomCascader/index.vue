<template>
    <el-form-item :label="item.label" :prop="item.key">
        <el-cascader
            class="w"
            v-model="formData[item.key]"
            :label="item.props.label"
            :placeholder="item.placeholder"
            :props="item.props"
            :disabled="item.disabled"
            :options="item.children"
            :collapse-tags="item.collapseTags !== false"
            :clearable="item.clearable !== false"
            @change="item.change"
        />
    </el-form-item>
</template>

<script setup lang="ts">
import {commonApi} from "@/api/common";
import  { CascaderOption } from "element-plus/lib/components/cascader-panel/src/types";
import type { CascaderProps } from 'element-plus'

// let {proxy} = getCurrentInstance()

interface Params {
    default?: number | string
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
    loadMore: boolean
    collapseTags: boolean
    filter: string
    pageNumber: number
    method: string
    url: string
    props: Props
    params: Params // remote为ture时 请求所带参数
    paramsType: string // remote为ture时 请求参数类型，‘url’则参数是拼接在url后面
    children: Array<CascaderOption>
    clearable: boolean
    disabled: boolean,
    change: Function
}

// @ts-ignore
const { formData, item } = defineProps<{
    formData: Object,
    item: Item,
}>()

// @ts-ignore
item.data = item.data || { label: '选择时间' }

console.log(item, formData, 'cascader')

const props: CascaderProps = {
  lazy: true,
  lazyLoad(node, resolve) {
    const { level, value } = node
    console.log(node, 'node')
    let params = item.params || {}
    let url = item.url
    if (item.paramsType === 'url') {
        // params = {}
        url += (value || item.params.default)
    }
    commonApi(url, params, item.method).then(res=>{
        console.log(res, 'item.url')
        let list:CascaderOption[] = [];
        if(res) {
            (res as unknown as CascaderOption[]).map(item => {
                list.push({
                    ...item,
                    leaf: level >= 2
                })
            })
        }
        resolve(list)
    })
  }
}
if (item.remote) {
    item.props = {...item.props, ...props}
}

// const emit = defineEmits(['update:name'])
</script>

<style scoped lang="scss"></style>