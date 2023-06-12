<template>
    <el-form-item :label="item.label">
        <el-col :span="11">
            <el-form-item :prop="item.key[0]">
                <el-date-picker class="w form-picker"
                                v-model="formData[item.key[0]]"
                                :type="item.data.type || 'date'"
                                :value-format="item.data.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
                                :disabled="item.disabled"
                                :placeholder="item.placeholder || '开始时间'"
                                :clearable="item.clearable !== false"
                                :disabled-date="item.disabledDate"
                />
            </el-form-item>
        </el-col>
        <el-col :span="2" class="tw_c">-</el-col>
        <el-col :span="11">
            <el-form-item :prop="item.key[1]">
                <el-date-picker class="w form-picker"
                                v-model="formData[item.key[1]]"
                                :type="item.data.type || 'date'"
                                :value-format="item.data.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
                                :disabled="item.disabled"
                                :placeholder="item.endPlaceholder || '结束时间'"
                                :clearable="item.clearable !== false"
                                :disabled-date="item.endDisabledDate"
                />
            </el-form-item>
        </el-col>
    </el-form-item>
</template>

<script setup lang="ts">

// @ts-ignore
const {formData, item} = defineProps({
    formData: Object,
    item: Object
})
item.data = item.data || {}

</script>

<style scoped lang="scss">

</style>
