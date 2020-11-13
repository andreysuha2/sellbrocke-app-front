export default {
    controlledCompany(state, getters, rootState) {
        const { companies } = rootState.companies,
            id = state.controlledId;
        return id ? companies.find((company) => company.id === id) : null;
    },
    hasControlled(state, getters) {
        return Boolean(getters.controlledCompany);
    }
};
