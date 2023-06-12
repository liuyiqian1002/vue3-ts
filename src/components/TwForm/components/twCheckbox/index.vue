<template>
    <el-form-item :label="item.label" :prop="item.key">
        <el-checkbox-group v-model="formData[item.key]" v-if="item.children.length >1">
            <el-checkbox v-for="(tag, i) in item.children" :key="i" :label="tag[item.props?.value ?? 'value']" :name="tag[item.props?.label ?? 'label']" :true-label="item.props?.trueLabel" :false-label="item.props?.falseLabel" />
        </el-checkbox-group>
        <el-checkbox v-else v-model="formData[item.key]" :label="item.children[0][item.props?.value ?? 'value']" @change="checkChange" :true-label="item.props?.trueLabel" :false-label="item.props?.falseLabel">{{item.children[0][item.props?.label ?? 'label']}}</el-checkbox>
    </el-form-item>
</template>

<script setup lang="ts">
import { cloneDeep } from "lodash"

// @ts-ignore
const { formData, item } =  defineProps({
    formData:Object,
    item: Object
})

// @ts-ignore
item.data = item.data|| { label: '选择时间', }

const emits = defineEmits(['tapClick'])
const checkChange = (val)=>{
    emits('tapClick', 'checkChange', {val, item, children: item.children})
}

</script>

<style scoped lang="scss">

</style>


