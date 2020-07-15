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
    setCurrentCategory(state, category) {
        state.currentCategory = category;
    }
};
