<template>
    <div class="app-page">
        <div class="app-page--header flex justify-between items-center">
            <div class="app-page--title">
                <h1>{{ title }}</h1>
            </div>
            <slot name="header"></slot>
        </div>
        <div class="app-page--body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.app-page {
    width: 100%;
    max-width: 1665px;

    &--header {
        margin-bottom: 30px;
    }

    &--body {
        padding: 30px 40px;
        background: $appBg;
    }
}
</style>
