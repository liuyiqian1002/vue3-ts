<template>
    <el-form-item :label="item.label" :prop="item.key">
        <el-radio-group v-model="formData[item.key]" @change="onChange">
            <template v-if="item.filter">
                <el-radio v-for="(tag, i) in $store.getters.arrEnumerate[item.filter]" :key="i" :value="tag[item.props?.value ?? 'value']">{{tag[item.props?.label ?? 'label']}}</el-radio>
            </template>
            <template v-else>
                <el-radio v-for="(tag, i) in item.children" :key="i" :label="tag[item.props?.value ?? 'value']">{{tag[item.props?.label ?? 'label']}}</el-radio>
            </template>
        </el-radio-group>
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
