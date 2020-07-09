import http from "@http/companies";

export default {
    loadCompanies({ commit }) {
        return new Promise((resolve, reject) => {
            http.getAll().then((resp) => {
                const { companies } = resp.data;
                commit("loadCompanies", companies);
                resolve(companies);
            }).catch((e) => reject(e));
        });
    },
    createCompany({ commit }, data) {
        return new Promise((resolve, reject) => {
            http.company.create(data)
                .then((resp) => {
                    const { company } = resp.data;
                    commit("addCompany", company);
                    resolve(company);
                }).catch((e) => reject(e));
        });
    },
    updateCompany({ commit }, { data, id }) {
        return new Promise((resolve, reject) => {
            http.company.update(id, data)
                .then((resp) => {
                    const { company } = resp.data;
                    commit("updateCompany", company);
                    resolve(company);
                })
                .catch((e) => reject(e));
        });
    },
    removeCompany({ commit }, id) {
        return new Promise((resolve, reject) => {
            http.company.delete(id)
                .then((resp) => {
                    const { company } = resp.data;
                    commit("removeCompany", company.id);
                    resolve(company);
                }).catch((e) => reject(e));
        });
    }
};
