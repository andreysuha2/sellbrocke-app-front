export default {
    device(state, getters, rootState) {
        const id = state.deviceId,
            { devices } = rootState.devices;
        return id ? devices.find((device) => device.id === id) : null;
    },
    hasCurrentDevice(state, getters) {
        return Boolean(getters.device);
    }
};
