<template>
  <div class="app flex flex-col">
    <notifications position="top right" />
    <app-header/>
    <div class="flex app--wrapper">
        <div class="app--menu">
            <app-menu ref="appMenu"/>
        </div>
        <div class="app--content flex flex-col">
            <main class="app--main">
                <nuxt/>
            </main>
            <app-footer class="app--footer"/>
        </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@global/TheHeader";
import AppFooter from "@global/TheFooter";
import AppMenu from "@global/TheMenu";

export default {
    name: "default",
    middleware: "authenticate",
    components: {
        "app-header": AppHeader,
        "app-footer": AppFooter,
        "app-menu": AppMenu
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
        overflow: auto;
    }

    &--main {
        padding: 20px;
        overflow-y: scroll;
        flex: 1 0 auto;
        max-width: 100%;
        max-height: calc(100vh - 140px);
    }

    &--footer {
        flex: 0 0 auto;
    }
}
</style>
