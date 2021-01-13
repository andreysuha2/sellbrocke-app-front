<template>
    <app-page title="Settings">
        <md-tabs>
            <md-tab id="tab-common" md-label="Common">
                <settings-common></settings-common>
            </md-tab>
            <md-tab id="tab-address" md-label="Address">
                <settings-address></settings-address>
            </md-tab>
            <md-tab id="tab-payment" md-label="Payment">
                <settings-payment></settings-payment>
            </md-tab>
            <md-tab id="tab-fedex" md-label="FedEx">
                <settings-shipping-fedex></settings-shipping-fedex>
            </md-tab>
            <md-tab id="tab-ups" md-label="UPS">
                <settings-shipping-ups></settings-shipping-ups>
            </md-tab>
        </md-tabs>
    </app-page>
</template>

<script>
import Common from "@components/settings/common";
import Address from "@components/settings/address";
import Payment from "@components/settings/payment";
import FedEx from "@components/settings/shipping/FedEx/index";
import UPS from "@components/settings/shipping/UPS/index";

export default {
    name: "settings",
    components: {
        "settings-common": Common,
        "settings-address": Address,
        "settings-payment": Payment,
        "settings-shipping-fedex": FedEx,
        "settings-shipping-ups": UPS
    }
};
</script>

<style scoped>

</style>
