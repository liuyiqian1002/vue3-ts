<template>
    <el-form-item :label="item.label" :prop="item.key">
        <el-cascader class="w"
                     v-model="formData[item.key]"
                     :label="item.data.label"
                     :placeholder="item.placeholder"
                     :props="item.props"
                     :disabled="item.disabled"
                     :options="item.children"
                     :collapse-tags="item.collapseTags!==false"
                     :clearable="item.clearable !== false"
        />
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
