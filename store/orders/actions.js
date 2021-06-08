import http from "@http/orders";

export default {
    loadOrders({ commit }, { query = null, page = null }) {
        return new Promise((resolve, reject) => {
            http.getOrders(query, page)
                .then((resp) => {
                    const { orders, meta } = resp.data;
                    commit("app/pagePagination/setItems", orders, { root: true });
                    commit("app/pagePagination/setPagination", meta, { root: true });
                    resolve(orders);
                }).catch((e) => reject(e));
        });
    }
};
