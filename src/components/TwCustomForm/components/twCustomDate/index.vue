<template>
    <el-form-item :label="item.label" :prop="item.key">
        <el-date-picker class="w form-picker"
                        v-model="formData[item.key]"
                        :type="item.data.type || 'date'"
                        :value-format="item.data.valueFormat || 'YYYY-MM-DD HH:mm:ss'"
                        :disabled="item.disabled"
                        :placeholder="item.placeholder"
                        :clearable="item.clearable !== false"
                        @change="dateChange"
        />
    </el-form-item>
</template>

<script setup lang="ts">

// @ts-ignore
const {formData, item} = defineProps({
    formData: Object,
    item: Object
})
item.data = item.data || {}

const emits = defineEmits(['tapClick'])
const dateChange = (val)=>{
    if(item.change){
        item.change(val)
    }
    emits('tapClick', 'dateChange', {val, item, children: item.children})
}

</script>

<style scoped lang="scss">

</style>
