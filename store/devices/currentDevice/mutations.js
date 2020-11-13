export default {
    setDevice(state, id) {
        state.deviceId = id;
    },
    cancelDevice(state) {
        state.deviceId = null;
    }
};
