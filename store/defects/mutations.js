import { camelizeObject } from "@helpers/functions";

export default {
    setDefects(state, { defects, meta }) {
        state.defects = defects;
        state.meta = camelizeObject(meta);
    },
    addDefect(state, defect) {
        state.defects.push(defect);
        state.meta.total++;
    }
};
