<template>
    <app-page v-if="isCurrentPaginateItems" title="Products grids">
        <template #header>
            <md-button
                @click="showCreatePopup = true"
                class="md-button md-primary md-raised">Add new</md-button>
        </template>
        <md-empty-state
            v-if="!hasProductsGrids"
            md-icon="filter_frames"
            md-label="Create your first product grid"
            md-description="Create products grid for attach to devices">
            <md-button
                @click="showCreatePopup = true"
                class="md-primary md-raised">Create product grid</md-button>
        </md-empty-state>
        <template v-else>
            <md-table class="products-grids-list">
                <md-table-row>
                    <md-table-head class="products-grids-list--id" md-numeric>ID</md-table-head>
                    <md-table-head>Name</md-table-head>
                    <md-table-head>Slug</md-table-head>
                    <md-table-head>Type</md-table-head>
                    <md-table-head>Controls</md-table-head>
                </md-table-row>
                <md-table-row v-for="productGrid in productsGrids" :key="productGrid.id">
                    <md-table-cell class="products-grids-list--id" md-numeric>{{ productGrid.id }}</md-table-cell>
                    <md-table-cell>
                        <div class="flex items-center">
                            <div v-if="productGrid.thumbnail"
                                class="products-grids-list--thumbnail">
                                <img :src="productGrid.thumbnail" alt="">
                            </div>
                            <span>{{ productGrid.name }}</span>
                        </div>
                    </md-table-cell>
                    <md-table-cell>{{ productGrid.slug }}</md-table-cell>
                    <md-table-cell>{{ productGrid.type }}</md-table-cell>
                    <md-table-cell>
                        <md-button
                            @click="selectProductGrid(productGrid.id)"
                            class="products-grids-list--control md-icon-button md-raised">
                            <md-icon>edit</md-icon>
                        </md-button>
                        <md-button
                            @click="removeConfirmation(productGrid)"
                            class="products-grids-list--control md-icon-button md-raised">
                            <md-icon>delete</md-icon>
                        </md-button>
                    </md-table-cell>
                </md-table-row>
            </md-table>
            <div class="products-grids-pagination flex justify-between items-center">
                <app-pagination v-if="hasPages"/>
                <div></div>
                <span>total products grids: {{ totalItems }}</span>
            </div>
        </template>
        <update-product-grid
            @closePopup="clearProductGrid"
            @updateProductGrid="updatePaginateItem($event)"
            :show-popup="showUpdatePopup"/>
        <create-product-grid
            @addProductGrid="addPaginateItem($event)"
            @closePopup="showCreatePopup = false"
            :show-popup="showCreatePopup"/>
        <md-dialog-confirm
            :md-active.sync="showDeleteConfirmation"
            :md-content='`Do you whant delete product grid "${deletedProductGridData.name}"?`'
            @md-cancel="cancelDelete"
            @md-confirm="confirmDelete"
            md-title="Delete product grid"/>
    </app-page>
</template>

<script>
import paginationMixin from "@mixins/pages/pagination";
import CreationPopup from "@components/productsGrids/CreationPopup";
import UpdatePopup from "@components/productsGrids/UpdatePopup";
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";

export default {
    mixins: [ paginationMixin ],
    components: {
        "create-product-grid": CreationPopup,
        "update-product-grid": UpdatePopup
    },
    async fetch({ store, route, redirect }) {
        try {
            const { page } = route.query;
            await store.dispatch("productsGrids/loadProductsGrids", page);
            const { currentPage, lastPage } = store.state.app.pagePagination.pagination;
            if(currentPage > lastPage) redirect({ name: 'devices-products-grids' });
        } catch (e) {
            dl.error(e.response);
        }
    },
    data() {
        return {
            showCreatePopup: false,
            showDeleteConfirmation: false,
            deletedProductGridData: {
                id: null,
                name: null
            }
        };
    },
    computed: {
        ...mapState("app/pagePagination", { productsGrids: "items" }),
        ...mapGetters("productsGrids", [ "hasProductsGrids" ]),
        ...mapGetters("productsGrids/currentProductGrid", { showUpdatePopup: "hasSelectedProductGrid" })
    },
    methods: {
        ...mapMutations("productsGrids/currentProductGrid", {
            selectProductGrid: "enableProductGrid",
            clearProductGrid: "disableProductGrid"
        }),
        ...mapActions("productsGrids", { deleteProductGrid: "removeProductGrid" }),
        removeConfirmation({ id, name }) {
            this.deletedProductGridData.id = id;
            this.deletedProductGridData.name = name;
            this.showDeleteConfirmation = true;
        },
        cancelDelete() {
            this.showDeleteConfirmation = false;
            this.deletedProductGridData.id = null;
            this.deletedProductGridData.name = null;
        },
        confirmDelete() {
            this.deleteProductGrid(this.deletedProductGridData.id)
                .then(({ productGrid, nextProductGrid }) => {
                    this.$notify({
                        title: "Product grid deleted",
                        text: `Product grid "${productGrid.name}" was deleted!`
                    });
                    this.removePaginateItem(productGrid.id, nextProductGrid);
                }).catch((e) => this.handleServerErrors(e, "Delete product grid error"))
                .finally(() => this.cancelDelete());
        }
    }
};
</script>

<style lang="scss" scoped>
    .products-grids-list {
        &--id {
            width: 100px;
        }

        &--category:not(:last-child) {
            margin-right: 5px;

            &:after {
                content: ',';
            }
        }

        &--control:not(:last-child) {
            margin-right: 10px;
        }

        &--thumbnail {
            max-width: 25px;
            max-height: 25px;
            margin-right: 10px;
        }
    }

    .products-grids-pagination {
        margin-top: 30px;
    }
</style>
