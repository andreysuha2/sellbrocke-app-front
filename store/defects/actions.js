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
    }
};
