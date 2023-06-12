<script lang="tsx">

interface RenderParams {
    props: any;
    context: any;
}

export default {
    name: "MenuItem",
    functional: true,
    props: {
        icon: { type: String, default: "", },
        title: { type: String, default: "", },
    },
    render({props, context}: RenderParams) {
        const { icon, title } = props
        // @ts-ignore
        return (<svg-icon class="mr5" icon-class={icon} >{title}</svg-icon>);
    },
};
</script>

<style scoped>
.sub-el-icon {
    color: currentColor;
    width: 1em;
    height: 1em;
}
</style>
