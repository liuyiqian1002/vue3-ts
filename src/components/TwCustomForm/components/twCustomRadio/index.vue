<template>
    <el-form-item :label="item.label" :prop="item.key" @change="onChange">
        <el-radio-group v-model="formData[item.key]">
            <template v-if="item.filter">
                <el-radio v-for="(tag, i) in $store.getters.arrEnumerate[item.filter]" :key="i" :style="`width: ${item.width}px`" :label="tag[item.props?.value ?? 'value']" :value="tag[item.props?.value ?? 'value']">{{tag[item.props?.label ?? 'label']}}</el-radio>
            </template>
            <template v-else>
                <el-radio v-for="(tag, i) in item.children" :key="i" :style="`width: ${item.width}px`" :label="tag[item.props?.value ?? 'value']">{{tag[item.props?.label ?? 'label']}}</el-radio>
            </template>
        </el-radio-group>
    </el-form-item>
</template>

<script setup lang="ts">
import { cloneDeep } from "lodash"
import {watch} from "@vue/runtime-core";
import {watchEffect} from "vue";

// @ts-ignore
const { formData, item } =  defineProps({
    formData:Object,
    item: Object
})

// @ts-ignore
item.data = item.data|| { label: '选择时间', }

const onChange = (e) => {
    if(item.change) {
        item.change(e.target.value,e)
    }
}

// const emit = defineEmits(['update:name'])
</script>

<style scoped lang="scss">

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
