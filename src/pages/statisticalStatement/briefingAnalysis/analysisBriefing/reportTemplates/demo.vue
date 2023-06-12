<template>
  <div>
    
  </div>
</template>

<script setup lang="tsx">
const { title, data } = defineProps({
  title: { type: String, default: () => '' },
  data: { type: Object, default: () => [] },
  download: { type: Function, defualt: () => {}}
})
const proxy: any = getCurrentInstance()?.proxy

</script>

<style scoped lang="scss">
@import url(./briefReport.css);
</style>
