<template>
    <div class="menu flex items-center">
        <md-button
            @click="logout"
            class="md-icon-button md-raised">
            <md-icon>exit_to_app</md-icon>
        </md-button>
        <md-button class="menu--avatar md-icon-button md-raised">
            <md-icon>person</md-icon>
        </md-button>
        <span class="menu--name">John Doe</span>
    </div>
</template>

<script>
import auth from "@auth";

export default {
    methods: {
        logout() {
            auth.logout()
                .then(() => this.$router.go("/login"));
        }
    }
};
</script>

<style lang="scss" scoped>
.menu {
    &--avatar {
        margin: {
            right: 20px;
            left: 20px;
        };
    }
}
</style>
