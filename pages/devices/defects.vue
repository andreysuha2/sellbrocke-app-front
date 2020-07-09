<template>
    <app-page title="Defects"></app-page>
</template>

<script>
export default {
    async fetch({ store }) {
        try {
            await store.dispatch("defects/loadDefects");
        } catch (e) {
            dl.error(e);
        }
    }
};
</script>
