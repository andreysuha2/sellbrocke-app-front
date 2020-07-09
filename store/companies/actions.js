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
    }
};
