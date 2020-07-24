export default {
    hasSelectedProductGrid(state) {
        return Boolean(state.productGridId);
    },
    currentProductGrid(state, getters, rootState) {
        if(!getters.hasSelectedProductGrid) return null;
        return rootState.app.pagePagination.items.find((productGrid) => productGrid.id === state.productGridId);
    }
};
