import { camelizeObject } from "@helpers/functions";

export default {
    setDefects(state, { defects, meta }) {
        state.defects = defects;
        state.meta = camelizeObject(meta);
    },
    addDefect(state, defect) {
        const { defects } = state;
        defects.unshift(defect);
        if(state.meta.total > state.meta.perPage) defects.splice(defects.length - 1, 1);
    },
    updateDefect(state, defectData) {
        const defectIndex = state.defects.findIndex((defect) => defect.id === defectData.id);
        if(defectIndex !== -1) state.defects.splice(defectIndex, 1, defectData);
    },
    deleteDefect(state, id) {
        const defectIndex = state.defects.findIndex((defect) => defect.id === id);
        if(defectIndex !== -1) state.defects.splice(defectIndex, 1);
    },
    addNextDefect(state, defect) {
        if(defect) state.defects.push(defect);
    },
    recalculateMeta(state, diff) {
        const { meta } = state;
        meta.total = meta.total + diff;
        const expectedLastPage = Math.ceil(meta.total / meta.perPage);
        if(expectedLastPage !== meta.lastPage) meta.lastPage = expectedLastPage;
    }
};
