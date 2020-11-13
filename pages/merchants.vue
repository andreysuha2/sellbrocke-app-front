<template>
    <app-page title="Merchants">
        <md-table class="merchants-list">
            <md-table-row>
                <md-table-head class="merchants-list--id" md-numeric>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Url</md-table-head>
                <md-table-head>Login</md-table-head>
                <md-table-head>Password</md-table-head>
            </md-table-row>
            <md-table-row v-for="merchant in merchants" :key="merchant.id">
                <md-table-cell class="merchants-list--id" md-numeric>{{ merchant.id }}</md-table-cell>
                <md-table-cell>{{ merchant.name }}</md-table-cell>
                <md-table-cell>
                    <a target="_blank" :href="`${merchant.url}/wp-login.php`">{{ merchant.url }}</a>
                </md-table-cell>
                <md-table-cell>{{ merchant.login }}</md-table-cell>
                <md-table-cell>
                    <md-button
                        @click="openUpdatePassword(merchant.id)"
                        class="md-raised md-primary">Update password</md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <update-password
            @closePopup="closeUpdatePassword"
            :show-popup="showUpdatePassword"/>
    </app-page>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import UpdatePasswordPopup from "@components/merchants/UpdatePasswordPopup";

export default {
    name: "MerchantsPage",
    components: { "update-password": UpdatePasswordPopup },
    async fetch({ store }) {
        try {
            await store.dispatch("merchants/loadList");
        } catch (e) {
            dl.error(e);
        }
    },
    data() {
        return { showUpdatePassword: false };
    },
    computed: { ...mapState("merchants", { merchants: "list" }) },
    methods: {
        ...mapMutations("merchants/merchant", [ "setMerchant", "cancelMerchant" ]),
        openUpdatePassword(id) {
            this.setMerchant(id);
            this.showUpdatePassword = true;
        },
        closeUpdatePassword() {
            this.cancelMerchant();
            this.showUpdatePassword = false;
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
