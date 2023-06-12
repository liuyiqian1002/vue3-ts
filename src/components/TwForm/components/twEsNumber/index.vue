<template>
    <el-form-item :label="item.label">
        <el-col :span="10">
            <el-form-item :prop="item.key[0]">
                <el-input class="w" v-model="formData[item.key[0]]"
                          :maxlength="item.maxlength"
                          :minlength="item.minlength"
                          :showWordLimit="item.showWordLimit"
                          :placeholder="item.placeholder || '请输入月数'"
                          :showPassword="item.showPassword"
                          :disabled="item.disabled"
                          :size="item.size"
                          :prefixIcon="item.prefixIcon"
                          :suffixIcon="item.suffixIcon" :rows="item.rows"
                          :readonly="item.readonly"
                          :resize="item.resize"
                          :validateEvent="item.validateEvent"
                          :inputStyle="item.inputStyle"
                          :clearable="item.clearable !== false"
                />
            </el-form-item>
        </el-col>
        <el-col :span="2" class="tw_c">至</el-col>
        <el-col :span="10">
            <el-form-item :prop="item.key[1]">
                <el-input class="w" v-model="formData[item.key[1]]"
                          :maxlength="item.maxlength"
                          :minlength="item.minlength"
                          :showWordLimit="item.showWordLimit"
                          :placeholder="item.placeholder || '请输入月数'"
                          :showPassword="item.showPassword"
                          :disabled="item.disabled"
                          :size="item.size"
                          :prefixIcon="item.prefixIcon"
                          :suffixIcon="item.suffixIcon" :rows="item.rows"
                          :readonly="item.readonly"
                          :resize="item.resize"
                          :validateEvent="item.validateEvent"
                          :inputStyle="item.inputStyle"
                          :clearable="item.clearable !== false"
                />
            </el-form-item>
        </el-col>
        <el-col :span="2" class="tw_c">月</el-col>
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
