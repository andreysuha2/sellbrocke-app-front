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
                    commit("setDevices", devices);
                    commit("setMeta", meta);
                    resolve(devices);
                }).catch((e) => reject(e));
        });
    },
    createDevice({ commit }, data) {
        return new Promise((resolve, reject) => {
            http.device.create(data)
                .then((resp) => {
                    const { device } = resp.data;
                    commit("addDevice", device);
                    resolve(device);
                }).catch((e) => reject(e));
        });
    }
};
