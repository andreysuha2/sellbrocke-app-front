import { arrayChunk } from "@helpers/functions";

export default {
    companiesChunks(state, getters) {
        return getters.has ? arrayChunk(state.companies, 10) : null;
    },
    has(state, getters) {
        return Boolean(getters.count);
    },
    count(state) {
        return state.companies ? state.companies.length : null;
    }
};
