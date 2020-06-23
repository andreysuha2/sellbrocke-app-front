import http from "@http/user";
import auth from "@auth";

export default {
    loadUser({ commit }) {
        return new Promise((resolve, reject) => {
            auth.check()
                .then(() => http.load())
                .then((resp) => {
                    const { user } = resp.data;
                    commit("setUser", user);
                    resolve(user);
                })
                .catch(e => {
                    if(e.status === 401) resolve(false);
                    reject(e);
                });
        });
    }
};
