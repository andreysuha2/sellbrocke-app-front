export default {
    hasDefects(state) {
        return state.meta ? Boolean(state.meta.total) : null;
    }
};
