<template>
    <el-form-item :label="item.label" :prop="item.key">
        <el-switch v-model="formData[item.key]" :disabled="item.disabled"  />
    </el-form-item>
<!--        <el-time-picker-->
<!--            v-model="formData[item.key]"-->
<!--            :label="item.data.label"-->
<!--            :placeholder="item.placeholder"-->
<!--            :clearable="item.clearable !== false"-->
<!--        />-->
</template>

<script setup lang="ts">


const { formData, item } =  defineProps({
    formData:Object,
    item: Object
})



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
