<template>
    <div class="devices">
        <md-table class="devices--list devices-list">
            <md-table-row>
                <md-table-head class="devices-list--id" md-numeric>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Condition</md-table-head>
                <md-table-head>Base price</md-table-head>
                <md-table-head>Discounted price</md-table-head>
                <md-table-head>Count defects</md-table-head>
                <md-table-head>Controls</md-table-head>
            </md-table-row>
            <md-table-row
                v-for="device in devices" :key="device.id">
                <md-table-cell class="devices-list--id">{{ device.deviceId }}</md-table-cell>
                <md-table-cell>
                    <div class="flex items-center">
                        <div class="devices-list--image"
                            :style="{ backgroundImage: `url(${device.thumbnail})` }">
                        </div>
                        <span class="devices-list--name">{{ device.name }}</span>
                    </div>
                </md-table-cell>
                <md-table-cell>{{ device.condition.label }}</md-table-cell>
                <md-table-cell>{{ device.prices.base }}$</md-table-cell>
                <md-table-cell>{{ device.prices.discounted }}$</md-table-cell>
                <md-table-cell>{{ device.defects.length }}</md-table-cell>
                <md-table-cell>
                    <md-button
                        @click="setDevice(device.id)"
                        class="md-raised md-primary order--pay">View device</md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <device-popup
            @closePopup="cancelDevice"
            :show="hasSelectedDevice"/>
    </div>
</template>

<script>
import DevicePopup from "./Popup";
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
    components: { "device-popup": DevicePopup },
    computed: {
        ...mapState("orders/order", { devices: (state) => state.order.devices }),
        ...mapGetters("orders/order", [ "currentDevice" ]),
        hasSelectedDevice() {
            return Boolean(this.currentDevice);
        }
    },
    methods: {
        ...mapMutations("orders/order", {
            setDevice: "setCurrentDevice",
            cancelDevice: "cancelCurrentDevice"
        })
    },
    beforeDestroy() {
        this.cancelDevice();
    }
};
</script>

<style lang="scss" scoped>
    .devices-list {
        &--id {
            width: 100px;
        }

        &--image {
            width: 50px;
            height: 50px;
            margin-right: 10px;
            background: {
                size: contain;
                repeat: no-repeat;
                position: center center;
            };
        }
    }
</style>
