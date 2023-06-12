<template>
    <el-form-item :label="item.label" :prop="item.key">
        <el-time-picker class="w"
                        v-model="formData[item.key]"
                        :placeholder="item.placeholder"
                        :disabled="item.disabled"
                        :clearable="item.clearable !== false"
                        @change="timeChange"
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

const emits = defineEmits(['tapClick'])
const timeChange = (val)=>{
    if(item.change){
        item.change(val)
    }
    emits('tapClick', 'timeChange', {val, item, children: item.children})
}

</script>

<style scoped lang="scss">

</style>


