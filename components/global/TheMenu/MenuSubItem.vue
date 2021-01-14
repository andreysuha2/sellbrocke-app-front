<template>
    <div :class="{ 'sub-item__active': isCurrent }"
        class="sub-item">
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
    computed: {
        isCurrent() {
            return this.link === this.$route.name;
        }
    },
    methods: {
        navigate() {
            if(this.link !== "#") this.$router.push({ name: this.link });
            this.$emit('clickSub');
        }
    }
};
</script>

<style lang="scss" scoped>
.sub-item {
    cursor: pointer;
    color: $appBg;

    &__active {
        color: $appColor3;
    }

    &:not(:last-child) {
        margin-bottom: 5px;
    }
}
</style>
