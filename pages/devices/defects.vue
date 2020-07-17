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
                        <md-button
                            @click="openUpdatePopup(defect.id)"
                            class="defects-list--control md-icon-button md-raised">
                            <md-icon>edit</md-icon>
                        </md-button>
                        <md-button
                            @click="removeConfimation(defect)"
                            class="defects-list--control md-icon-button md-raised">
                            <md-icon>delete</md-icon>
                        </md-button>
                    </md-table-cell>
                </md-table-row>
            </md-table>
            <div class="defects-pagination flex justify-between items-center">
                <app-pagination
                    @changePage="loadDefects($event)"
                    v-if="paginateMeta"
                    :current-page="paginateMeta.currentPage"
                    :total-pages="paginateMeta.lastPage"/>
                <div></div>
                <span>total defects: {{ totalDefects }}</span>
            </div>
        </template>
        <md-dialog-confirm
            :md-active.sync="showDeleteConfirmation"
            :md-content='`Do you whant delete defect "${deletedDefectData.name}"?`'
            @md-cancel="cancelDelete"
            @md-confirm="confirmDelete"
            md-title="Delete defect"/>
        <create-defect
            @closePopup="showCreatePopup = false"
            :show-popup="showCreatePopup"/>
        <update-defect
            @closePopup="closeUpdatePopup"
            :show-popup="showUpdatePopup"/>
    </app-page>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import CreatePopup from "@components/defects/CreationPopup";
import UpdatePopup from "@components/defects/UpdatePopup";

export default {
    components: {
        "create-defect": CreatePopup,
        "update-defect": UpdatePopup
    },
    async fetch({ store, route, redirect }) {
        try {
            const { page } = route.query;
            await store.dispatch("defects/loadDefects", page);
            const { currentPage, lastPage } = store.state.defects.meta;
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
        ...mapGetters("defects", { hasDefects: "hasDefects" }),
        ...mapGetters("defects/currentDefect", { showUpdatePopup: "hasDefect" }),
        ...mapState("defects", {
            defectsList: "defects",
            totalDefects: (state) => state.meta.total,
            paginateMeta: (state) => state.meta
        })
    },
    methods: {
        ...mapActions("defects", {
            loadDefects: "loadDefects",
            deleteDefect: "deleteDefect"
        }),
        ...mapMutations("defects/currentDefect", {
            openUpdatePopup: "setDefect",
            closeUpdatePopup: "cancelDefect"
        }),
        removeConfimation({ id, name }) {
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
                .then((defect) => {
                    this.$notify({
                        title: "Defect deleted",
                        text: `Defect "${defect.name}" was deleted!`
                    });
                    this.redirectFromLastEmptyPage();
                }).catch((e) => this.handleServerErrors(e, "Delete defect error"))
                .finally(() => this.cancelDelete());
        },
        redirectFromLastEmptyPage() {
            const currentPage = this.$route.query.page;
            if(currentPage && Number(currentPage) > this.paginateMeta.lastPage) {
                const { name } = this.$route;
                this.$router.push({ name, query: { ...this.$route.query, page: this.paginateMeta.lastPage } });
                this.loadDefects(this.paginateMeta.lastPage);
            }
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
    }

    .defects-pagination {
        margin-top: 20px;
    }
</style>
