<template>
    <md-dialog
        @md-clicked-outside="$emit('closePopup')"
        :md-active="show">
        <template v-if="show">
            <md-dialog-title>Order device #{{ device.deviceId }}</md-dialog-title>
            <div class="order-device">
                <div class="order-device--row justify-center">
                    <div :style="{ backgroundImage: `url(${device.thumbnail})` }"
                        class="order-device--image"></div>
                </div>
                <div class="order-device--row">
                    <div class="order-device--cell">
                        <span>Name</span>
                    </div>
                    <div class="order-device--cell">
                        <span>{{ device.name }}</span>
                    </div>
                </div>
                <div class="order-device--row">
                    <div class="order-device--cell">
                        <span>Condition</span>
                    </div>
                    <div class="order-device--cell">
                        <span>{{ device.condition.label }} ({{ device.condition.discountPercent }}%)</span>
                    </div>
                </div>
                <div class="order-device--row">
                    <div class="order-device--cell">
                        <span>Company</span>
                    </div>
                    <div class="order-device--cell">
                        <span>{{ device.company.name }} ({{ device.company.priceReduction }}%)</span>
                    </div>
                </div>
                <div class="order-device--row">
                    <div class="order-device--cell">
                        <span>Defects</span>
                    </div>
                    <div class="order-device--cell">
                        <span v-for="defect in device.defects" :key="defect.id">
                            {{ defect.name }} ({{defect.priceReduction}}%)
                        </span>
                    </div>
                </div>
                <div class="order-device--row">
                    <div class="order-device--cell">
                        <span>Total discounted</span>
                    </div>
                    <div class="order-device--cell">
                        <span>{{ totalDiscounted }}%</span>
                    </div>
                </div>
                <div class="order-device--row">
                    <div class="order-device--cell">
                        <span>Base price</span>
                    </div>
                    <div class="order-device--cell">
                        <span>{{ device.prices.base }}$</span>
                    </div>
                </div>
                <div class="order-device--row">
                    <div class="order-device--cell">
                        <span>Discounted price</span>
                    </div>
                    <div class="order-device--cell">
                        <span>{{ device.prices.discounted }}$</span>
                    </div>
                </div>
            </div>
        </template>
    </md-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    props: {
        show: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        ...mapGetters("orders/order", { device: "currentDevice" }),
        totalDiscounted() {
            const { defects } = this.device,
                defectsPercent = defects.reduce((summ, defect) => Number(defect.priceReduction) + summ, 0),
                conditionPercent = Number(this.device.condition.discountPercent),
                companyPercent = Number(this.device.company.priceReduction),
                total = defectsPercent + companyPercent + conditionPercent;
            return total < 100 ? total.toFixed(2) : "> 100";
        }
    }
};
</script>

<style lang="scss" scoped>
.order-device {
    padding: 20px;
    width: 440px;

    &--image {
        width: 150px;
        height: 150px;
        background: {
            position: center center;
            size: contain;
            repeat: no-repeat;
        };
    }

    &--row {
        display: flex;

        &:not(:last-child) {
            margin-bottom: 10px;
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
            margin-right: 5px;
        }
    }
}
</style>
