export default {
    setCategories(state, categories) {
        state.categories = categories;
    },
    setDefects(state, defects) {
        state.defectsList = defects;
    },
    addCategory(state, category) {
        state.categories.unshift(category);
    },
    setCurrentCategory(state, { category, path: breadcrumbs }) {
        state.currentCategory = category;
        state.breadcrumbs = [ state.breadcrumbs[0], ...breadcrumbs ];
    }
};
