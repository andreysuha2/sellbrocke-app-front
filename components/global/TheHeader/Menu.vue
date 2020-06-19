<template>
    <div class="menu flex items-center">
        <md-button class="menu--avatar md-icon-button md-raised">
            <md-icon>person</md-icon>
        </md-button>
        <span class="menu--name">John Doe</span>
    </div>
</template>

<style lang="scss" scoped>
.menu {
    &--avatar {
        margin: {
            right: 20px;
            left: 0;
        };
    }
}
</style>
