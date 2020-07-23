export default {
    setCategories(state, categories) {
        state.categories = categories;
    },
    setCompanies(state, companies) {
        state.companies = companies;
    },
    deleteDevice(state, deviceId) {
        const deviceIndex = state.devices.findIndex((device) => device.id === deviceId);
        if(deviceIndex !== -1) state.devices.splice(deviceIndex, 1);
    }
};
