import http from "@http/defects";

export default {
    loadDefects({ commit }, page = null) {
        return new Promise((resolve, reject) => {
            http.getDefects(page)
                .then((resp) => {
                    const { data } = resp;
                    commit("setDefects", data);
                    resolve(data);
                }).catch((e) => reject(e));
        });
    },
    createDefect({ commit, state, dispatch }, data) {
        return new Promise((resolve, reject) => {
            http.defect.create(data)
                .then((resp) => {
                    const { defect } = resp.data;
                    if(state.meta.currentPage === 1) {
                        commit("addDefect", defect);
                        commit("recalculateMeta", 1);
                    } else dispatch("loadDefects", state.meta.currentPage);
                    resolve(defect);
                }).catch(e => reject(e));
        });
    },
    updateDefect({ commit }, { id, data }) {
        return new Promise((resolve, reject) => {
            http.defect.update(id, data)
                .then((resp) => {
                    const { defect } = resp.data;
                    commit("updateDefect", defect);
                    resolve(defect);
                }).catch((e) => reject(e));
        });
    },
    deleteDefect({ commit, getters }, id) {
        return new Promise((resolve, reject) => {
            http.defect.delete(id, { lastDefectId: getters.lastDefectId })
                .then((resp) => {
                    const { defect, nextDefect } = resp.data;
                    commit("deleteDefect", id);
                    commit("recalculateMeta", -1);
                    if(nextDefect) commit("addNextDefect", nextDefect);
                    resolve(defect);
                }).catch(e => reject(e));
        });
    }
};
