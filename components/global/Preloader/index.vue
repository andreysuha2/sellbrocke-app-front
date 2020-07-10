<template>
    <div class="app-preloader">
        <div v-if="active" class="app-preloader--spinner flex flex-center">
            <md-progress-spinner v-bind="$attrs">
            </md-progress-spinner>
        </div>
        <div class="app-preloader--content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        active: {
            type: Boolean,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.app-preloader {
    position: relative;

    &--spinner {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        background-color: rgba(0, 0, 0, .7);
        z-index: 10;
    }
}
</style>
