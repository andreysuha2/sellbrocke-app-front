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
    removeCategory(state, id) {
        if(state.categories) {
            const categoryIndex = state.categories.findIndex((category) => category.id === id);
            if(categoryIndex !== -1) state.categories.splice(categoryIndex, 1);
        }
    },
    setBreadcrumbs(state, breadcrumbs) {
        state.breadcrumbs = [ state.breadcrumbs[0], ...breadcrumbs ];
    }
};
