<template>
    <app-page v-if="isCurrentPaginateItems" title="Defects">
        <template #header>
            <md-button
                @click="showCreatePopup = true"
                class="md-primary md-raised">Add new</md-button>
        </template>
        <md-empty-state
            v-if="!hasItems"
            md-icon="broken_image"
            md-label="Create your first defect"
            md-description="Defects helps to evaluate device">
            <md-button
                @click="showCreatePopup = true"
                class="md-primary md-raised">Create defect</md-button>
        </md-empty-state>
        <template v-else>
            <md-table class="defects-list">
                <md-table-row>
                    <md-table-head class="defects-list--id" md-numeric>ID</md-table-head>
                    <md-table-head>Name</md-table-head>
                    <md-table-head>Price reduction</md-table-head>
                    <md-table-head>Description</md-table-head>
                    <md-table-head>Control</md-table-head>
                </md-table-row>
                <md-table-row v-for="defect in defectsList" :key="defect.id">
                    <md-table-cell class="defects-list--id" md-numeric>{{ defect.id }}</md-table-cell>
                    <md-table-cell>{{ defect.name }}</md-table-cell>
                    <md-table-cell>{{ defect.priceReduction }}%</md-table-cell>
                    <md-table-cell>
                        <p class="defects-list--description">{{ defect.description }}</p>
                    </md-table-cell>
                    <md-table-cell>
                        <div class="defects-list--controls">
                            <md-button
                                @click="openUpdatePopup(defect.id)"
                                class="defects-list--control md-icon-button md-raised">
                                <md-icon>edit</md-icon>
                            </md-button>
                            <md-button
                                @click="removeConfirmation(defect)"
                                class="defects-list--control md-icon-button md-raised">
                                <md-icon>delete</md-icon>
                            </md-button>
                        </div>
                    </md-table-cell>
                </md-table-row>
            </md-table>
            <div class="defects-pagination flex justify-between items-center">
                <app-pagination v-if="hasPages"/>
                <div></div>
                <span>total defects: {{ totalItems }}</span>
            </div>
        </template>
        <md-dialog-confirm
            :md-active.sync="showDeleteConfirmation"
            :md-content='`Do you whant delete defect "${deletedDefectData.name}"?`'
            @md-cancel="cancelDelete"
            @md-confirm="confirmDelete"
            md-title="Delete defect"/>
        <create-defect
            @addDefect="addPaginateItem($event)"
            @closePopup="showCreatePopup = false"
            :show-popup="showCreatePopup"/>
        <update-defect
            @updateDefect="updatePaginateItem($event)"
            @closePopup="closeUpdatePopup"
            :show-popup="showUpdatePopup"/>
    </app-page>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import paginationMixin from "@mixins/pages/pagination";
import CreatePopup from "@components/defects/CreationPopup";
import UpdatePopup from "@components/defects/UpdatePopup";

export default {
    mixins: [ paginationMixin ],
    components: {
        "create-defect": CreatePopup,
        "update-defect": UpdatePopup
    },
    async fetch({ store, route, redirect }) {
        try {
            const { page } = route.query;
            await store.dispatch("defects/loadDefects", page);
            const { currentPage, lastPage } = store.state.app.pagePagination.pagination;
            if(currentPage > lastPage) redirect({ name: 'devices-defects' });
        } catch (e) {
            dl.error(e);
        }
    },
    data() {
        return {
            showCreatePopup: false,
            showDeleteConfirmation: false,
            deletedDefectData: {
                id: null,
                name: null
            }
        };
    },
    computed: {
        ...mapGetters("defects/currentDefect", { showUpdatePopup: "hasDefect" }),
        ...mapState("app/pagePagination", { defectsList: "items" })
    },
    methods: {
        ...mapActions("defects", { deleteDefect: "deleteDefect" }),
        ...mapMutations("defects/currentDefect", {
            openUpdatePopup: "setDefect",
            closeUpdatePopup: "cancelDefect"
        }),
        removeConfirmation({ id, name }) {
            this.deletedDefectData.id = id;
            this.deletedDefectData.name = name;
            this.showDeleteConfirmation = true;
        },
        cancelDelete() {
            this.deletedDefectData.id = null;
            this.deletedDefectData.name = null;
            this.showDeleteConfirmation = false;
        },
        confirmDelete() {
            this.deleteDefect(this.deletedDefectData.id)
                .then(({ defect, nextDefect }) => {
                    this.$notify({
                        title: "Defect deleted",
                        text: `Defect "${defect.name}" was deleted!`
                    });
                    this.removePaginateItem(defect.id, nextDefect);
                }).catch((e) => this.handleServerErrors(e, "Delete defect error"))
                .finally(() => this.cancelDelete());
        }
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

        &--description {
            margin: 0;
            max-width: 800px;
        }

        &--controls {
            min-width: 150px;
        }
    }

    .defects-pagination {
        margin-top: 20px;
    }
</style>
