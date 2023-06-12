<template>
    <el-icon :class="className" :color="color" :size="size">
        <svg :class="classList" aria-hidden="true">
            <use :xlink:href="iconName" />
        </svg>
    </el-icon>
<!--    <span class="svgicon-txt">-->
<!--        <slot></slot>-->
<!--    </span>-->
</template>

<script setup lang="ts">

const props = defineProps({
    className: { type: String, default: '', },
    iconClass: { type: String, required: true, default: (row)=> row || '' },
// color: { type: String, default: '#409eff', },
    color: { type: String, default: '#86909C', },
    size: { type: String, default: '20px', },
})
const classList = computed(() => {
    return ['icon', props.className || '']
})
const iconName = computed(() => {
    return `#${props.iconClass}`
})
</script>
<style lang="scss" scoped>
.icon {
    /* v-bind是Vue3才支持的功能，可以将CSS的值与js的值绑定 */
    width: v-bind('props.size');
    height: v-bind('props.size');
    position: relative;
    vertical-align: -2px;
    fill: currentColor;
    color: inherit;
}
</style>
