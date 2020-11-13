export default {
    hasProductsGrids(state, getters, rootState) {
        const { items: productsGrids } = rootState.app.pagePagination;
        return productsGrids ? Boolean(productsGrids.length) : false;
    },
    lastProductGridId(state, getters, rootState) {
        const { items: productsGrids } = rootState.app.pagePagination;
        if(productsGrids) {
            const lastProductGrid = productsGrids[productsGrids.length - 1];
            return lastProductGrid ? lastProductGrid.id : null;
        }
        return null;
    }
};
