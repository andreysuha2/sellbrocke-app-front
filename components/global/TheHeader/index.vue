<template>
    <header class="app-header flex justify-between items-center">
        <div class="app-header--logo">
            <app-logo/>
        </div>
        <div class="app-header-menu">
            <user-menu/>
        </div>
    </header>
</template>

<script>
import AppLogo from "@global/TheLogo";
import UserMenu from "./Menu";

export default {
    components: {
        "app-logo": AppLogo,
        "user-menu": UserMenu
    }
};
</script>

<style lang="scss" scoped>
.app-header {
    padding: 20px 30px;
    box-shadow: $appBoxShadow;
    background-color: $appBg;
}
</style>
