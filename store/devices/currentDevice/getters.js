export default {
    device(state, getters, rootState) {
        const id = state.deviceId,
            { items: devices } = rootState.app.pagePagination;
        return id ? devices.find((device) => device.id === id) : null;
    },
    hasCurrentDevice(state, getters) {
        return Boolean(getters.device);
    }
};
