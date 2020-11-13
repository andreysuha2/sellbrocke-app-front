<template>
    <div class="menu flex items-center">
        <md-button
            @click="logout"
            class="md-icon-button md-raised">
            <md-icon>exit_to_app</md-icon>
        </md-button>
        <md-button @click="toAccount" class="menu--avatar md-icon-button md-raised">
            <md-icon>person</md-icon>
        </md-button>
        <span class="menu--name">{{ name }}</span>
    </div>
</template>

<script>
import auth from "@auth";
import { mapState } from "vuex";

export default {
    computed: { ...mapState("user", { name: (state) => state.currentUser.name }) },
    methods: {
        logout() {
            auth.logout()
                .then(() => this.$router.go("/login"));
        },
        toAccount() {
            this.$router.push({ name: "account" });
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
