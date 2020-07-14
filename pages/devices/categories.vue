<template>
    <app-page title="Categories">
        <template #header>
            <md-button
                @click="showCreatePopup = true"
                class="md-button md-primary md-raised">Add new</md-button>
        </template>
        <md-empty-state
            v-if="!hasCategories"
            md-icon="view_list"
            md-label="Create your first category"
            md-description="You cant create devices without category">
            <md-button
                @click="showCreatePopup = true"
                class="md-primary md-raised">Create category</md-button>
        </md-empty-state>
        <create-category
            @closePopup="showCreatePopup = false"
            :show-popup="showCreatePopup"/>
    </app-page>
</template>

<script>
import CreationPopup from "@components/categories/CreationPopup";

export default {
    async fetch({ store }) {
        try {
            await store.dispatch("categories/loadCategories");
        } catch (e) {
            dl.error(e);
        }
    },
    components: { "create-category": CreationPopup },
    data() {
        return { showCreatePopup: false };
    },
    computed: {
        hasCategories() {
            return false;
        }
    }
};
</script>
