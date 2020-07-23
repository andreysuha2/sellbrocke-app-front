<template>
    <app-page title="Products grids">
        <template #header>
            <md-button
                @click="showCreatePopup = true"
                class="md-button md-primary md-raised">Add new</md-button>
        </template>
        <md-empty-state
            md-icon="filter_frames"
            md-label="Create your first product grid"
            md-description="Create products grid for attach to devices">
            <md-button
                @click="showCreatePopup = true"
                class="md-primary md-raised">Create product grid</md-button>
        </md-empty-state>
        <create-product-grid
            @addProductGrid="addNextPaginateItem($event)"
            @closePopup="showCreatePopup = false"
            :show-popup="showCreatePopup"/>
    </app-page>
</template>

<script>
import paginationMixin from "@mixins/pages/pagination";
import CreationPopup from "@components/productsGrids/CreationPopup";

export default {
    mixins: [ paginationMixin ],
    components: { "create-product-grid": CreationPopup },
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
        return { showCreatePopup: false };
    }
};
</script>
