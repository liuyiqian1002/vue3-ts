<template>
    <el-form-item :label="item.label" :prop="item.key">
        <ElDatePicker class="w form-picker" v-model="formData[item.key]" :type="item.data.type || 'date'"
            :value-format="item.data.valueFormat || 'YYYY-MM-DD HH:mm:ss'" :format="item.data.format" :disabled="item.disabled"
            :placeholder="item.placeholder" :clearable="item.clearable !== false" @change="dateChange" :disabled-date="item.disabledDate">

        </ElDatePicker>
    </el-form-item>
</template>

<script setup lang="ts">
// import DatePicker from '../date-picker/index'
// @ts-ignore
const { formData, item } = defineProps({
    formData: Object,
    item: Object
})
item.data = item.data || {}

const emits = defineEmits(['tapClick'])
const dateChange = (val) => {
    if (item.change) {
        item.change(val)
    }
    emits('tapClick', 'dateChange', { val, item, children: item.children })
}

</script>

<style scoped lang="scss"></style>
