export default {
    currentDefect(state, getters, rootState) {
        const id = state.defectId;
        return id ? rootState.app.pagePagination.items.find((defect) => defect.id === id) : null;
    },
    hasDefect(state, getters) {
        return Boolean(getters.currentDefect);
    }
};
