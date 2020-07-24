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
    hasDevices(state, getters, rootState) {
        const { items: devices } = rootState.app.pagePagination;
        return devices ? Boolean(devices.length) : false;
    },
    lastDeviceId(state, getters, rootState) {
        const { items: devices } = rootState.app.pagePagination;
        if(devices) {
            const lastDevice = devices[devices.length - 1];
            return lastDevice ? lastDevice.id : null;
        }
        return null;
    },
    productsGridsCarriers(state) {
        return state.productsGrids ? state.productsGrids.filter((productGrid) => productGrid.type === "carrier") : null;
    },
    productsGridsSizes(state) {
        return state.productsGrids ? state.productsGrids.filter((productGrid) => productGrid.type === "size") : null;
    }
};
