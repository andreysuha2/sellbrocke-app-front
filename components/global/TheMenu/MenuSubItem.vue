<template>
    <div class="sub-item">
        <span @click="navigate">{{ name }}</span>
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
    },
    methods: {
        navigate() {
            if(this.link !== "#") this.$router.push({ name: this.link });
        }
    }
};
</script>

<style lang="scss" scoped>
.sub-item {
    cursor: pointer;

    &:not(:last-child) {
        margin-bottom: 5px;
    }
}
</style>
