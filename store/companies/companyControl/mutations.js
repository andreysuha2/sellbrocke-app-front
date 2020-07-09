export default {
    startControl(state, companyId) {
        state.controlledId = companyId;
    },
    stopControl(state) {
        state.controlledId = null;
    }
};
