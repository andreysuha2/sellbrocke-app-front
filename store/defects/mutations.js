export default {
    setDefects(state, { defects, meta }) {
        state.defects = defects;
        state.meta = meta;
    },
    addDefect(state, defect) {
        state.defects.push(defect);
        state.meta.total++;
    }
};
