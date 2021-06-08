<template>
    <app-page v-if="isCurrentPaginateItems" title="Orders">
        <app-search
            :on-search="search"
            v-model="searchQuery"
            name="customers-search"
            placeholder="Search customers"/>
        <md-empty-state
            v-if="!hasOrders"
            md-icon="assignment"
            md-label="Your orders"
            md-description="Here will showing orders">
        </md-empty-state>
        <md-table v-else class="orders-list">
            <md-table-row>
                <md-table-head class="orders-list--id" md-numeric>ID</md-table-head>
                <md-table-head>Status</md-table-head>
                <md-table-head>Devices count</md-table-head>
                <md-table-head>Customer</md-table-head>
                <md-table-head>Base price</md-table-head>
                <md-table-head>Discounted price</md-table-head>
                <md-table-head>Date (UTC)</md-table-head>
            </md-table-row>
            <md-table-row v-for="order in orders" :key="order.id">
                <md-table-cell class="orders-list--id" md-numeric>{{ order.id }}</md-table-cell>
                <md-table-cell>
                    <span class="orders-list--status"
                        :class="`orders-list--status__${order.status}`">{{ order.status }}</span>
                </md-table-cell>
                <md-table-cell>{{ order.devices.length }}</md-table-cell>
                <md-table-cell>
                    <a
                        :href="getCustomerLink(order.customer)"
                        target="_blank">
                        {{ order.customer | customerName }}
                    </a>
                </md-table-cell>
                <md-table-cell>{{ order.prices.base }}$</md-table-cell>
                <md-table-cell>{{ order.prices.discounted }}$</md-table-cell>
                <md-table-cell>
                    <div class="orders-list--date">{{ order.date | orderDate }}</div>
                </md-table-cell>
                <md-table-cell>
                    <md-button
                        @click="viewOrder(order.id)"
                        class="md-primary md-raised">
                        View order
                    </md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <div class="orders-pagination flex justify-between items-center">
            <app-pagination v-if="hasPages"/>
            <div></div>
            <span>total orders: {{ totalItems }}</span>
        </div>
    </app-page>
</template>

<script>
import paginationMixin from "@mixins/pages/pagination";
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
    mixins: [ paginationMixin ],
    asyncData({ query }) {
        return { searchQuery: query.qs || "" };
    },
    async fetch({ store, route, redirect }) {
        try {
            const { page, qs } = route.query;
            await store.dispatch("orders/loadOrders", { query: qs, page });
            const { currentPage, lastPage } = store.state.app.pagePagination.pagination;
            if(currentPage > lastPage) redirect({ name: 'devices-defects' });
        } catch (e) {
            dl.error(e);
        }
    },
    filters: {
        customerName(customer) {
            const { firstName, lastName } = customer;
            let name = firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName;
            return name || customer.login;
        },
        orderDate(timestamp) {
            return moment(timestamp).format("MMM, D Y H:mm");
        }
    },
    computed: {
        ...mapState("app/pagePagination", { orders: "items" }),
        hasOrders() { return Boolean(this.orders.length); }
    },
    methods: {
        ...mapActions("orders", [ "loadOrders" ]),
        getCustomerLink(customer) {
            return `${customer.merchant.url}/wp-admin/user-edit.php?user_id=${customer.ids.merchant}`;
        },
        viewOrder(orderId) {
            this.$router.push({ name: "orders-id", params: { id: orderId } });
        },
        search() {
            return new Promise((resolve, reject) => {
                this.loadOrders({ query: this.searchQuery })
                    .then(result => {
                        resolve(result);
                        this.$router.push({ name: "orders", query: { qs: this.searchQuery } });
                    })
                    .catch(e => reject(e));
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    .orders-list {
        &--id {
            width: 100px;
        }

        &--date {
            min-width: 129px;
        }

        &--status {
            &__open {
                color: green;
            }

            &__closed {
                color: blue;
            }

            &__canceled {
                color: red;
            }
        }
    }

    .orders-pagination {
        margin-top: 30px;
    }
</style>
