<template>
    <app-page title="Admin account">
        <div class="admin-account">
            <div class="admin-account--row">
                <div class="admin-account--cell">
                    <span>ID</span>
                </div>
                <div class="admin-account--cell">
                    <span>{{ admin.id }}</span>
                </div>
            </div>
            <div class="admin-account--row">
                <div class="admin-account--cell">
                    <span>Name</span>
                </div>
                <div class="admin-account--cell">
                    <span>{{ admin.name }}</span>
                </div>
            </div>
            <div class="admin-account--row">
                <div class="admin-account--cell">
                    <span>Email</span>
                </div>
                <div class="admin-account--cell">
                    <span>{{ admin.email }}</span>
                </div>
            </div>
            <div class="admin-account--row">
                <div class="admin-account--control">
                    <md-button
                        @click="showUpdatePopup = true"
                        class="md-primary md-raised">Update</md-button>
                </div>
                <div class="admin-account--control">
                    <md-button
                        @click="logout"
                        class="md-primary md-raised md-accent">Logout</md-button>
                </div>
            </div>
        </div>
        <update-form @closePopup="showUpdatePopup"/>
    </app-page>
</template>

<script>
import { mapState } from "vuex";
import auth from "@auth";
import UpdateForm from "@components/admin/UpdatePopup";

export default {
    name: "AdminAccount",
    components: { "update-form": UpdateForm },
    data() {
        return { showUpdatePopup: false };
    },
    computed: { ...mapState("user", { admin: (state) => state.currentUser }) },
    methods: {
        logout() {
            auth.logout()
                .then(() => this.$router.go("/login"));
        }
    }
};
</script>

<style lang="scss" scoped>
.admin-account {
    &--row {
        display: flex;

        &:not(:last-child) {
            margin-bottom: 15px;
        }
    }

    &--cell {
        &:first-child {
            font-weight: bold;

            &:after {
                content: ':';
            }
        }

        &:not(:first-child) {
            margin-left: 5px;
        }

        &:not(:last-child) {
            margin-left: 5px;
        }
    }

    &--control {
        &:not(:first-child) {
            margin-left: 7.5px;
        }

        &:not(:last-child) {
            margin-left: 7.5px;
        }
    }
}
</style>
