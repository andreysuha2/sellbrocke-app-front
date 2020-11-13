export default {
    setDefect(state, id) {
        state.defectId = id;
    },
    cancelDefect(state) {
        state.defectId = null;
    }
};
