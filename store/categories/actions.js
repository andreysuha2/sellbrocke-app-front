import http from "@http/categories";

export default {
    loadCategories({ commit }) {
        return new Promise((resolve, reject) => {
            http.getCategories()
                .then((resp) => {
                    const { categories } = resp.data;
                    commit("setCategories", categories);
                    resolve(categories);
                }).catch((e) => reject(e));
        });
    },
    createCategory({ commit }, { data, parentId = null }) {
        return new Promise((resolve, reject) => {
            http.category.create(data, parentId)
                .then((resp) => {
                    const { category } = resp.data;
                    commit("addCategory", category);
                    resolve(category);
                }).catch((e) => reject(e));
        });
    }
};
