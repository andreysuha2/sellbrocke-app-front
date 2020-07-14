export default {
    setCategories(state, categories) {
        state.categories = categories;
    },
    addCategory(state, category) {
        state.categories.unshift(category);
    },
    setCurrentCategory(state, category) {
        state.currentCategory = category;
    }
};
