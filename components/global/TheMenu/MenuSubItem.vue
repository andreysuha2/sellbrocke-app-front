<template>
    <div class="sub-item">
        <span>{{ name }}</span>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.sub-item {
    &:not(:last-child) {
        margin-bottom: 5px;
    }
}
</style>
