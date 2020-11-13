export default {
    hasItems(state) {
        return state.pagination ? Boolean(state.pagination) : null;
    }
};
