<template>
    <div id="car_management">
        <tw-dialog :title="title" width="700px" height="800px" v-model="dialogFlag">
            <div class="tw_c">
                <el-transfer
                    v-model="value"
                    style="height: 500px"
                    filterable
                    :titles="['未关注车辆', '已关注车辆']"
                    :filter-method="filterMethod"
                    filter-placeholder="请输入车牌号"
                    :data="data"
                />
            </div>
        </tw-dialog>
    </div>
</template>

<script setup lang="tsx">
defineProps({
    title: String,
})
let dialogFlag = $ref(false)

const viewData = () => {
    dialogFlag = true
}


interface Option {
    key: number
    label: string
    initial: string
}

const generateData = () => {
    const data: Option[] = []
    const states = [
        'California',
        'Illinois',
        'Maryland',
        'Texas',
        'Florida',
        'Colorado',
        'Connecticut',
        'Connecticut1',
        'Connecticut2',
        'Connecticut3',
        'Connecticut4',
        'Connecticut5',
        'Connecticut6',
        'Connecticut7',
        'Connecticut8',
        'Connecticut9',
    ]
    const initials = ['CA', 'IL', 'MD', 'TX', 'FL', 'CO', 'CT', 'CT1', 'CT2', 'CT3', 'CT4', 'CT5', 'CT6', 'CT7', 'CT8', 'CT9']
    states.forEach((city, index) => {
        data.push({
            label: city,
            key: index,
            initial: initials[index],
        })
    })
    return data
}

const data = ref<Option[]>(generateData())
const value = ref([])

const filterMethod = (query, item) => {
    console.log(item);
    return item.initial.includes(query)
}


defineExpose({ viewData, })
</script>

<style scoped lang="scss">
#car_management {
    :deep(.el-transfer-panel) {
        height: 100%;
        .el-transfer-panel__body { height: calc(100% - 41px)}
    }
}
</style>
