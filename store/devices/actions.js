import http from "@http/devices";

export default {
    loadDevices({ commit }, page = null) {
        return new Promise((resolve, reject) => {
            http.getDevices(page)
                .then((resp) => {
                    const { companies, categories } = resp.data,
                        { data: devices, meta } = resp.data.devices;
                    commit("setCategories", categories);
                    commit("setCompanies", companies);
                    commit("app/pagePagination/setItems", devices, { root: true });
                    commit("app/pagePagination/setPagination", meta, { root: true });
                    resolve(devices);
                }).catch((e) => reject(e));
        });
    },
    createDevice({ rootState, dispatch }, data) {
        return new Promise((resolve, reject) => {
            const { currentPage } = rootState.app.pagePagination.pagination;
            http.device.create(data)
                .then((resp) => {
                    const { device } = resp.data;
                    if(currentPage !== 1) dispatch("loadDevices", currentPage);
                    resolve(device);
                }).catch((e) => reject(e));
        });
    },
    updateDevice({}, { id, data }) {
        return new Promise((resolve, reject) => {
            http.device.update(id, data)
                .then((resp) => {
                    const { device } = resp.data;
                    resolve(device);
                }).catch((e) => reject(e));
        });
    },
    removeDevice({ getters }, id) {
        return new Promise((resolve, reject) => {
            http.device.delete(id, { lastDeviceId: getters.lastDeviceId })
                .then((resp) => {
                    const { data } = resp;
                    resolve(data);
                }).catch((e) => reject(e));
        });
    }
};
