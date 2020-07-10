export default {
    hasDefects(state) {
        return state.meta ? Boolean(state.meta.total) : null;
    },
    lastDefectId(state) {
        const { defects } = state;
        if(defects) {
            const lastDefect = defects[defects.length - 1];
            return lastDefect ? lastDefect.id : null;
        }
        return null;
    }
};
