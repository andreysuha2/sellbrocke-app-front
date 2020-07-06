import http from "@http/merchants";

export default {
    loadList({ commit }) {
        return new Promise((resolve, reject) => {
            http.loadAll()
                .then((resp) => {
                    const { merchants } = resp.data;
                    commit("setList", merchants);
                    resolve(merchants);
                }).catch(e => reject(e));
        });
    }
};
