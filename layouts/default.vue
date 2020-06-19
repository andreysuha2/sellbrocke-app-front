<template>
  <div class="app flex flex-col">
    <app-header/>
    <div class="flex app--wrapper">
        <div class="app--menu"></div>
        <div class="app--content">
            <main class="app--main">
                <nuxt/>
            </main>
            <app-footer/>
        </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@global/TheHeader";
import AppFooter from "@global/TheFooter";

export default {
    components: {
        "app-header": AppHeader,
        "app-footer": AppFooter
    }
};
</script>

<style lang="scss" scoped>
.app {
    background-color: $appBg1;
    height: 100%;

    &--wrapper {
        height: 100%;
    }

    &--menu {
        width: 100%;
        max-width: 200px;
        background: {
            color: $appBg2;
        };
    }

    &--content {
        width: 100%;
    }

    &--app-main {
        padding: 20px;
        overflow-x: scroll;
    }
}
</style>

