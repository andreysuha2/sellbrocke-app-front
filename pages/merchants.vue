<template>
    <app-page title="Merchants">
        merchants
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
    computed: { ...mapState("merchants", { merchants: "list" }) }
};
</script>
