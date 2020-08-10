import http from "@http/customers";

export default {
    loadCustomers({ commit }, page = null) {
        return new Promise((resolve, reject) => {
            http.getCustomers(page)
                .then((resp) => {
                    const { customers, meta } = resp.data;
                    commit("app/pagePagination/setItems", customers, { root: true });
                    commit("app/pagePagination/setPagination", meta, { root: true });
                    resolve(customers);
                }).catch((e) => reject(e));
        });
    }
};
