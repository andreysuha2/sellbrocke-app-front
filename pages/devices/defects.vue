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
        <md-table v-else class="defects-list">
            <md-table-row>
                <md-table-head class="defects-list--id" md-numeric>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Price reduction</md-table-head>
                <md-table-head>Description</md-table-head>
                <md-table-head>Control</md-table-head>
            </md-table-row>
            <md-table-row v-for="defect in defectsList" :key="defect.id">
                <md-table-cell class="merchants-list--id" md-numeric>{{ defect.id }}</md-table-cell>
                <md-table-cell>{{ defect.name }}</md-table-cell>
                <md-table-cell>{{ defect.priceReduction }}%</md-table-cell>
                <md-table-cell>{{ defect.description }}</md-table-cell>
                <md-table-cell>
                    <md-button class="defects-list--control md-icon-button md-raised">
                        <md-icon>edit</md-icon>
                    </md-button>
                    <md-button class="defects-list--control md-icon-button md-raised">
                        <md-icon>delete</md-icon>
                    </md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
        <app-pagination
            v-if="paginateMeta"
            :current-page="paginateMeta.currentPage"
            :total-pages="paginateMeta.lastPage"/>
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
            totalDefects: (state) => state.meta.total,
            paginateMeta: (state) => state.meta
        })
    }
};
</script>

<style lang="scss" scoped>
    .defects-list {
        &--id {
            width: 100px;
        }

        &--control:not(:last-child) {
            margin-right: 10px;
        }
    }
</style>
