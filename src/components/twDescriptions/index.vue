
<template>
    <el-descriptions :label-align="labelAlign" :title="title" :size="size" :column="column" :border="border" :direction="direction">
        <template #extra>
            <slot name="extra"></slot>
        </template>
        <el-descriptions-item v-for="(item, i) in lists" :key="i" :label="item.label" :span="item.span ?? 1" :class-name="item.class">
            <template #label>
                <div class="cell-item inline-block" :style="`width: ${labelWidth}px;text-align: ${labelPosition}`">
                    {{item.label}}
                </div>
            </template>
            {{!!item.filter?$store.getters.oEnumerate?.[item.filter]?.[data?.[item.key]] : data?.[item.key] || '-'}}</el-descriptions-item>
    </el-descriptions>
</template>


<script setup lang="ts">

let { data, title, size, labelWidth, lists, column, border, labelAlign, direction} = defineProps({
    data: { type: Object, default: ()=>{}},
    title: { type: String, default: ''},
    size: { type: String, default: ''},
    labelWidth: { type: Number, default: 100},
    labelPosition: { type: String, default: 'right'},
    lists: { type: Array, default: ()=>[]},
    column: { type: Number, default: 1},
    border: { type: Boolean, default: false},
    labelAlign: { type: String, default: ''},
    direction: { type: String, default: 'horizontal'},
})


</script>



<style lang="scss" scoped>
    .cell-item {
     display: inline-block;
    }
</style>
