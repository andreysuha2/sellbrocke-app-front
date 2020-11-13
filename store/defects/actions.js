import http from "@http/defects";

export default {
    loadDefects({ commit }, page = null) {
        return new Promise((resolve, reject) => {
            http.getDefects(page)
                .then((resp) => {
                    const { defects, meta } = resp.data;
                    commit("app/pagePagination/setItems", defects, { root: true });
                    commit("app/pagePagination/setPagination", meta, { root: true });
                    resolve(defects);
                }).catch((e) => reject(e));
        });
    },
    createDefect({ dispatch, rootState }, data) {
        return new Promise((resolve, reject) => {
            const { currentPage } = rootState.app.pagePagination.pagination;
            http.defect.create(data)
                .then((resp) => {
                    const { defect } = resp.data;
                    if(currentPage !== 1) dispatch("loadDefects", currentPage);
                    resolve(defect);
                }).catch(e => reject(e));
        });
    },
    updateDefect({}, { id, data }) {
        return new Promise((resolve, reject) => {
            http.defect.update(id, data)
                .then((resp) => {
                    const { defect } = resp.data;
                    resolve(defect);
                }).catch((e) => reject(e));
        });
    },
    deleteDefect({ getters }, id) {
        return new Promise((resolve, reject) => {
            http.defect.delete(id, { lastDefectId: getters.lastDefectId })
                .then((resp) => {
                    const { data } = resp;
                    resolve(data);
                }).catch(e => reject(e));
        });
    }
};
