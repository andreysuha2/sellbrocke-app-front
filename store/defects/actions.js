import http from "@http/defects";

export default {
    loadDefects({ commit }) {
        return new Promise((resolve, reject) => {
            http.getDefects()
                .then((resp) => {
                    const { data } = resp;
                    commit("setDefects", data);
                    resolve(data);
                }).catch((e) => reject(e));
        });
    },
    createDefect({ commit }, data) {
        return new Promise((resolve, reject) => {
            http.defect.create(data)
                .then((resp) => {
                    const { defect } = resp.data;
                    commit("addDefect", defect);
                    resolve(defect);
                }).catch(e => reject(e));
        });
    }
};
