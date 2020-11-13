export default {
    categoriesCount(state) {
        return state.categories ? state.categories.length : 0;
    },
    hasCategories(state, getters) {
        return Boolean(getters.categoriesCount);
    },
    isCategorySelected(state) {
        return Boolean(state.currentCategory);
    },
    isEmpty(state, getters) {
        return Boolean(!getters.hasCategories && !getters.isCategorySelected);
    }
};
