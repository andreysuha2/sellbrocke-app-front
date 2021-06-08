<template>
    <app-page v-if="isCurrentPaginateItems" title="Customers">
        <app-search
            :on-search="search"
            v-model="searchQuery"
            name="customers-search"
            placeholder="Search customers"/>
        <md-empty-state
            v-if="!hasCustomers"
            md-icon="people"
            md-label="Your merchants customers"
            md-description="Here will showing customers from your merchants">
        </md-empty-state>
        <md-table v-else class="customers-list">
            <md-table-row>
                <md-table-head class="customers-list--id" md-numeric>ID</md-table-head>
                <md-table-head>Merchant</md-table-head>
                <md-table-head>Login</md-table-head>
                <md-table-head>Email</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Merchant profile</md-table-head>
            </md-table-row>
            <md-table-row v-for="customer in customers" :key="customer.id">
                <md-table-cell class="devices-list--id" md-numeric>{{ customer.ids.app }}</md-table-cell>
                <md-table-cell>{{ customer.merchant.name }}</md-table-cell>
                <md-table-cell>{{ customer.login }}</md-table-cell>
                <md-table-cell>{{ customer.email }}</md-table-cell>
                <md-table-cell>{{ customer | name }}</md-table-cell>
                <md-table-cell>
                    <a
                      :href="`${customer.merchant.url}/wp-admin/user-edit.php?user_id=${customer.ids.merchant}`"
                      target="_blank">
                      profile
                    </a>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <div class="customers-pagination flex justify-between items-center">
            <app-pagination v-if="hasPages"/>
            <div></div>
            <span>total customers: {{ totalItems }}</span>
        </div>
    </app-page>
</template>

<script>
import paginationMixin from "@mixins/pages/pagination";
import { mapActions, mapState } from "vuex";

export default {
    mixins: [ paginationMixin ],
    asyncData({ query }) {
        return { searchQuery: query.qs || "" };
    },
    async fetch({ store, route, redirect }) {
        try {
            const { page, qs } = route.query;
            await store.dispatch("customers/loadCustomers", { query: qs, page });
            const { currentPage, lastPage } = store.state.app.pagePagination.pagination;
            if(currentPage > lastPage) redirect({ name: 'customers' });
        } catch (e) {
            dl.error(e.response);
        }
    },
    filters: {
        name(customer) {
            const { firstName, lastName } = customer;
            return firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName;
        }
    },
    computed: {
        ...mapState("app/pagePagination", { customers: "items" }),
        hasCustomers() {
            return Boolean(this.customers.length);
        }
    },
    methods: {
        ...mapActions("customers", [ 'loadCustomers' ]),
        search() {
            return new Promise((resolve, reject) => {
                this.loadCustomers({ query: this.searchQuery })
                    .then(result => {
                        resolve(result);
                        this.$router.push({ name: "customers", query: { qs: this.searchQuery } });
                    })
                    .catch(e => reject(e));
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.customers-list {
    &--id {
        width: 100px;
    }
}

.customers-pagination {
    margin-top: 30px;
}
</style>
