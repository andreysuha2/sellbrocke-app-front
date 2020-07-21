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
    },
    updateDevice(state, deviceData) {
        const deviceIndex = state.devices.findIndex((device) => device.id === deviceData.id);
        if(deviceIndex !== -1) state.devices.splice(deviceIndex, 1, deviceData);
    }
};
