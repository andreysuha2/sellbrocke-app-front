<template>
    <div class="app-page">
        <div
            :class="headerClass"
            class="app-page--header flex justify-between items-center">
            <div class="app-page--title">
                <h1>{{ title }}</h1>
            </div>
            <slot name="header"></slot>
        </div>
        <div
            :class="bodyClass"
            class="app-page--body">
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
        },
        headerClass: {
            type: [ Array, Object ],
            default() { return []; }
        },
        bodyClass: {
            type: [ Array, Object ],
            default() { return []; }
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
