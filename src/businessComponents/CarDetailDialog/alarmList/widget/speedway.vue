<template>
    <div class="card-widget-wrapper">
        <div class="table-wrapper"
            style="background:#fcf9f2;height: auto;top: 5px;right: 5px;z-index: 1000;">
            <div>
                <div class="loading_box" style="width:280px;">
                    <ul class="loading_content">
                        <div class="loading_content_wrap" id="loading_content">
                            <li>
                                <div class="content_list">
                                    <div class="content_text">高速进口站</div>
                                </div>
                                <div class="content_list">
                                    <div class="content_text">{{data?.speedwayEventInfoDto?.enterName}}</div>
                                </div>
                            </li>
                            <li>
                                <div class="content_list">
                                    <div class="content_text">进站时间</div>
                                </div>
                                <div class="content_list">
                                    <div class="content_text">
                                        <fmt:formatDate value="${speedwayEventInfoDto.enterTime}"
                                            pattern="yyyy-MM-dd HH:mm:ss" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="content_list">
                                    <div class="content_text">高速出口站</div>
                                </div>
                                <div class="content_list">
                                    <div class="content_text">{{data?.speedwayEventInfoDto?.exitName}}</div>
                                </div>
                            </li>
                            <li>
                                <div class="content_list">
                                    <div class="content_text">出站时间</div>
                                </div>
                                <div class="content_list">
                                    <div class="content_text">
                                        <fmt:formatDate value="${speedwayEventInfoDto.exitTime}"
                                            pattern="yyyy-MM-dd HH:mm:ss" />
                                    </div>
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const { row } = defineProps<{
    title: String,
    data: any
    row: any
}>()
const proxy: any = getCurrentInstance()?.proxy
console.log(row, 'row insert card')

</script>

<style scoped lang="scss">
.card-widget-wrapper {
    width: 100%;
    text-align: center;

    .table-wrapper {
        .loading_box {
            width: 100%;
            height: 100%;
            border: 1px solid #eeeff1;
            border-radius: 4px;
            position: relative;

            .loading_content {
                height: calc(100% - 48px);
                overflow-y: scroll;
                padding: 0px;
                margin: 0;

                // margin-right: -6px;

                .loading_content_wrap {
                    width: 100%;

                    li {
                        overflow: hidden;
                        display: flex;
                        align-items: center;
                        list-style: none;
                        border-bottom: 1px solid #eeeff1;
                        margin-right: 0px;
                        position: relative;

                        .content_list {
                            text-indent: 20px;
                            padding: 10px 0px;
                            display: flex;
                            align-items: center;
                            font-size: 14px;

                            .content_text {}
                        }

                        .content_list:last-child {
                            flex: 1;
                        }

                        .content_list:after {
                            content: '';
                            position: absolute;
                            height: 100%;
                            width: 1px;
                            background: #eeeff1;
                        }

                        .content_list:first-child::after {
                            content: '';
                            position: absolute;
                            height: 100%;
                            width: 1px;
                            background: transparent;
                        }

                        .content_list:first-child {
                            // flex: auto !important;
                            width: 100px !important;
                        }
                    }
                }
            }
        }
    }
}</style>