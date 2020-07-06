<template>
    <app-page title="Merchants">
        <md-table class="merchants-list">
            <md-table-row>
                <md-table-head class="merchants-list--id" md-numeric>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Login</md-table-head>
                <md-table-head>Password</md-table-head>
            </md-table-row>
            <md-table-row v-for="merchant in merchants" :key="merchant.id">
                <md-table-cell class="merchants-list--id" md-numeric>{{ merchant.id }}</md-table-cell>
                <md-table-cell>{{ merchant.name }}</md-table-cell>
                <md-table-cell>{{ merchant.login }}</md-table-cell>
                <md-table-cell>
                    <md-button
                        @click="updatePassword"
                        class="md-raised md-primary">Update password</md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
    </app-page>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "MerchantsPage",
    async fetch({ store }) {
        try {
            await store.dispatch("merchants/loadList");
        } catch (e) {
            dl.error(e);
        }
    },
    computed: { ...mapState("merchants", { merchants: "list" }) },
    methods: {
        updatePassword() {
            this.$notify({ text: "Coming soon", duration: 3000 });
        }
    }
};
</script>

<style lang="scss" scoped>
.merchants-list {
    &--id {
        width: 100px;
    }
}
</style>
