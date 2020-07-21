export default {
    hasCategories(state) {
        return state.categories ? state.categories.length : null;
    },
    hasCompanies(state) {
        return state.companies ? state.companies.length : null;
    },
    canCreate(state, getters) {
        return Boolean(getters.hasCategories && getters.hasCompanies);
    },
    hasDevices(state) {
        return state.devices ? Boolean(state.devices.length) : false;
    }
};
