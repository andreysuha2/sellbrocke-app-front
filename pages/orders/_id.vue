<template>
    <app-page :title="`Order #${$route.params.id}`"
            class="order">
        <div class="order--info info flex justify-between">
            <div class="flex">
                <div class="info--col">
                    <div class="info--row">
                        <div class="info--cell info--cell__head">
                            <span>Number</span>
                        </div>
                        <div class="info--cell">
                            <span>{{ order.id }}</span>
                        </div>
                    </div>
                    <div class="info--row">
                        <div class="info--cell info--cell__head">
                            <span>Status</span>
                        </div>
                        <div class="info--cell">
                            <span class="order--status"
                                :class="`order--status__${order.status}`">{{ order.status }}</span>
                        </div>
                    </div>
                    <div class="info--row">
                        <div class="info--cell info--cell__head">
                            <span>Devices count</span>
                        </div>
                        <div class="info--cell">
                            <span>{{ devicesCount }}</span>
                        </div>
                    </div>
                    <div class="info--row">
                        <div class="info--cell info--cell__head">
                            <span>Date (UTC)</span>
                        </div>
                        <div class="info--cell">
                            <span>{{ date }}</span>
                        </div>
                    </div>
                    <div class="info--row">
                        <div class="info--cell info--cell__head">
                            <span>Base price</span>
                        </div>
                        <div class="info--cell">
                            <span>{{ order.prices.base }}$</span>
                        </div>
                    </div>
                    <div class="info--row">
                        <div class="info--cell info--cell__head">
                            <span>Price discount</span>
                        </div>
                        <div class="info--cell">
                            <span>{{ order.prices.discounted }}$</span>
                        </div>
                    </div>
                </div>
                <div class="info--col">
                    <div class="info--row">
                        <div class="info--cell info--cell__head">
                            <span>Customer id</span>
                        </div>
                        <div class="info--cell">
                            <span>{{ customer.ids.app }}</span>
                        </div>
                    </div>
                    <div class="info--row">
                        <div class="info--cell info--cell__head">
                            <span>Customer login</span>
                        </div>
                        <div class="info--cell">
                            <a target="_blank"
                                :href="customerProfileUrl">{{ customer.login }}</a>
                        </div>
                    </div>
                    <div class="info--row">
                        <div class="info--cell info--cell__head">
                            <span>Customer name</span>
                        </div>
                        <div class="info--cell">
                            <span>{{ customerName }}</span>
                        </div>
                    </div>
                    <div class="info--row">
                        <div class="info--cell info--cell__head">
                            <span>Customer email</span>
                        </div>
                        <div class="info--cell">
                            <a :href="`mailto:${customer.email}`">{{ customer.email }}</a>
                        </div>
                    </div>
                    <div class="info--row">
                        <div class="info--cell info--cell__head">
                            <span>Customer merchant</span>
                        </div>
                        <div class="info--cell">
                            <a target="_blank"
                                :href="`${customer.merchant.url}/wp-admin`">{{ customer.merchant.name }}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex">
                <div class="order--status-change">
                    <md-field>
                        <label>Status</label>
                        <md-select
                            @md-selected="updateStatus($event)"
                            v-model="status">
                            <md-option
                                :key="status.key"
                                :value="status.value"
                                v-for="status in statusList">{{ status.value }}</md-option>
                        </md-select>
                    </md-field>
                </div>
                <md-button class="md-raised md-primary order--pay">Pay</md-button>
            </div>
        </div>
        <md-tabs class="order--content">
            <md-tab id="tab-devices" md-label="Devices">
                <devices-list/>
            </md-tab>
            <md-tab id="tab-log" md-label="Order log">
                <order-log/>
            </md-tab>
            <md-tab id="tab-shipment-log" md-label="Shipment Log">
                <div>Shipment Log</div>
            </md-tab>
        </md-tabs>
    </app-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import DevicesList from "@components/orders/order/devices";
import OrderLogs from "@components/orders/order/log";
import { genKey } from "@helpers/generators";

export default {
    name: "OrderPage",
    components: {
        "devices-list": DevicesList,
        "order-log": OrderLogs
    },
    async fetch({ store, route }) {
        try {
            const currentOrderId = store.state.orders.order.orderId;
            if(!currentOrderId || currentOrderId !== route.params.id) {
                await store.dispatch("orders/order/getOrder", route.params.id);
            }
        } catch (e) {
            dl.error(e);
        }
    },
    data() {
        return {
            status: null,
            statusList: null
        };
    },
    computed: {
        ...mapState("orders/order", {
            order: "order",
            logs: (state) => state.order.log
        }),
        devicesCount() {
            return this.order.devices.length;
        },
        date() {
            return moment(this.order.date).format("MMM, DD Y H:mm");
        },
        customer() {
            return this.order.customer;
        },
        customerName() {
            const { firstName, lastName } = this.customer,
                name = firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName;
            return name || "-";
        },
        customerProfileUrl() {
            const { url } = this.customer.merchant,
                { app: id } = this.customer.ids;
            return `${url}/wp-admin/user-edit.php?user_id=${id}`;
        }
    },
    methods: {
        ...mapActions("orders/order", { updateOrderStatus: "updateStatus" }),
        updateStatus(status) {
            this.updateOrderStatus(status)
                .then((statuses) => this.$notify({
                    title: "Order status change",
                    text: `Status change: "${statuses.oldStatus}" -> "${statuses.status}"`
                }))
                .catch((e) => this.handleServerErrors(e, "Update status error"));
        }
    },
    created() {
        this.status = this.order.status;
        this.statusList = [ "open", "closed", "canceled" ].map((status) => ({ value: status, key: genKey("OrderStatus") }));
    }
};
</script>

<style lang="scss" scoped>
.order {
    &--status {
        font-weight: bold;

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

    &--content {
        margin-top: 40px;
    }

    &--pay {
        background-color: green!important;
    }

    &--status-change {
        margin-right: 30px;
    }
}

.info {
    &--row {
        display: flex;

        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }

    &--col:not(:last-child) {
        margin-right: 20px;
    }

    &--cell {
        &:not(:last-child) {
            margin-right: 10px;
        }

        &__head {
            font-weight: bold;

            &:after {
                content: ':';
            }
        }
    }
}
</style>
