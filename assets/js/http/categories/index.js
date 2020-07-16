import Http from "@http";

class CategoriesHTTP extends Http {
    constructor() {
        super({ slug: "categories" });
    }

    getCategories() {
        return this.query.get("");
    }

    get category() {
        return this.group("category", (query) => ({
            create(data, parentId = null) {
                const path = parentId || "";
                return query.post(`${path}`, data);
            },
            read: (id, withDefects) => query.get(`${id}`, { params: { withDefects } }),
            update(id, data) {
                data.set("_method", "PUT");
                return query.post(`${id}`, data);
            },
            delete: (id) => query.delete(`${id}`)
        }));
    }
}

export default new CategoriesHTTP();
