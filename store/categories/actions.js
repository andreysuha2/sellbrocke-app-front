import http from "@http/categories";

export default {
    loadRootCategories({ commit, state }) {
        return new Promise((resolve, reject) => {
            http.getCategories()
                .then((resp) => {
                    const { categories, defects } = resp.data;
                    commit("setCategories", categories);
                    commit("setDefects", defects);
                    if(state.currentCategory) {
                        commit("setCurrentCategory", { category: null, path: [] });
                    }
                    resolve(categories);
                }).catch((e) => reject(e));
        });
    },
    loadCategory({ commit }, { id, withDefects = false }) {
        return new Promise((resolve, reject) => {
            http.category.read(id, Number(withDefects))
                .then((resp) => {
                    const { category, path, defects } = resp.data,
                        { children: categories } = category;
                    commit("setCurrentCategory", { category, path });
                    commit("setCategories", categories);
                    if(withDefects) commit("setDefects", defects);
                    resolve(category);
                })
                .catch((e) => reject(e));
        });
    },
    createCategory({ state, commit }, data) {
        return new Promise((resolve, reject) => {
            const { id: parentId } = state.currentCategory;
            http.category.create(data, parentId)
                .then((resp) => {
                    const { category } = resp.data;
                    commit("addCategory", category);
                    resolve(category);
                }).catch((e) => reject(e));
        });
    }
};
