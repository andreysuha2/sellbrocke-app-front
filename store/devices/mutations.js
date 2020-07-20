export default {
    setCategories(state, categories) {
        state.categories = categories;
    },
    setCompanies(state, companies) {
        state.companies = companies;
    },
    setDevices(state, devices) {
        state.devices = devices;
    },
    setMeta(state, meta) {
        state.meta = meta;
    },
    addDevice(state, device) {
        state.devices.unshift(device);
    }
};
