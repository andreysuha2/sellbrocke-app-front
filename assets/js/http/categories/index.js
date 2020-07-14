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
            }
        }));
    }
}

export default new CategoriesHTTP();
