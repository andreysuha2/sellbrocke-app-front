import http from "@http/productsGrids";

export default {
    loadProductsGrids({ commit }, page = null) {
        return new Promise((resolve, reject) => {
            http.getProductsGrids(page)
                .then((resp) => {
                    const { productsGrids, meta } = resp.data;
                    commit("app/pagePagination/setItems", productsGrids, { root: true });
                    commit("app/pagePagination/setPagination", meta, { root: true });
                    resolve(productsGrids);
                })
                .catch((e) => reject(e));
        });
    },
    createProductGrid({ rootState, dispatch }, data) {
        return new Promise((resolve, reject) => {
            const { currentPage } = rootState.app.pagePagination.pagination;
            http.productGrid.create(data)
                .then((resp) => {
                    const { productGrid } = resp.data;
                    if(currentPage !== 1) dispatch("loadDevices", currentPage);
                    resolve(productGrid);
                }).catch((e) => reject(e));
        });
    }
};
