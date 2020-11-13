export default {
    lastDefectId(state, getters, rootState) {
        const { items: defects } = rootState.app.pagePagination;
        if(defects) {
            const lastDefect = defects[defects.length - 1];
            return lastDefect ? lastDefect.id : null;
        }
        return null;
    }
};
