<template>
    <app-page title="Defects">
        <template #header>
            <md-button
                @click="showCreatePopup = true"
                class="md-primary md-raised">Add new</md-button>
        </template>
        <md-empty-state
            v-if="!hasDefects"
            md-icon="broken_image"
            md-label="Create your first defect"
            md-description="Defects helps to evaluate device">
            <md-button
                @click="showCreatePopup = true"
                class="md-primary md-raised">Create defect</md-button>
        </md-empty-state>
        <create-defect
            @closePopup="showCreatePopup = false"
            :show-popup="showCreatePopup"/>
    </app-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CreatePopup from "@components/defects/CreationPopup";

export default {
    components: { "create-defect": CreatePopup },
    async fetch({ store }) {
        try {
            await store.dispatch("defects/loadDefects");
        } catch (e) {
            dl.error(e);
        }
    },
    data() {
        return { showCreatePopup: false };
    },
    computed: {
        ...mapGetters("defects", { hasDefects: "hasDefects" }),
        ...mapState("defects", {
            defectsList: "defects",
            totalDefects: (state) => state.meta.total
        })
    }
};
</script>
