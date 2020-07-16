export default {
    setCategories(state, categories) {
        state.categories = categories;
    },
    setDefects(state, defects) {
        state.defectsList = defects;
    },
    addCategory(state, category) {
        state.categories.unshift(category);
        if(state.currentCategory) state.currentCategory.descendantsCount++;
    },
    setCurrentCategory(state, category) {
        state.currentCategory = category;
    },
    setBreadcrumbs(state, breadcrumbs) {
        state.breadcrumbs = [ state.breadcrumbs[0], ...breadcrumbs ];
    }
};
