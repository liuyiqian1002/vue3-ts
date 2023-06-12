<template>
    <span class="table-tag">
        <span class="table-tag " :class="`${notNull(type)?'table-'+type:'table-light'}`">
            <slot></slot>
        </span>
    </span>
</template>

<script lang="tsx" setup>

let { type } = defineProps({
    type: { type: String, default:''},
})

// export default {
//     name: "TableTag",
//     props:{
//         type: { type: String, default:''},
//     },
//     setup(){
//         const state = reactive({
//             obj: {
//                 0: '',
//                 1: 'success',
//                 2: 'info',
//                 3: 'warning',
//                 4: 'danger',
//             }
//         })
//
//     }
// }
</script>

<style lang="scss" scoped>
.table-tag {
    position: relative;
    padding-left: 6px;
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: -6px;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 4px;
    }
}

.table-light{
    &::after {
        background-color: #3299eb;
    }
}
.table-info{
    &::after {
        background-color: #d7d7d7;
    }
}
.table-warning{
    &::after {
        background-color: #e6a23c;
    }
}
.table-danger{
    &::after {
        background-color: #f56c6c;
    }
}
.table-success{
    &::after {
        background-color: #52c422;
    }
}
</style>
