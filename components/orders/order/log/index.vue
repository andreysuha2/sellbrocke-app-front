<template>
    <div class="logs">
        <div v-for="log in logs"
             :key="log.id"
             class="logs--row flex">
            <div class="logs--cell">
                <span>{{ log.timestamp | logDate }}</span>
            </div>
            <div class="logs--cell">
                <div v-html="log.message"></div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

export default {
    filters: {
        logDate(timestamp) {
            return moment(timestamp).format("Y-MM-DD H:mm:ss");
        }
    },
    computed: { ...mapState("orders/order", { logs: (state) => state.order.log }) }
};
</script>

<style lang="scss" scoped>
.logs {
    &--row:not(:last-child) {
        margin-bottom: 10px;
    }

    &--cell {
        &:not(:last-child) {
            margin-right: 15px;
        }

        &:last-child {
            font-weight: bold;
        }
    }
}
</style>
