import Http from "@http";

class ProductsGridsHTTP extends Http {
    constructor() {
        super({ slug: "products-grids" });
    }

    getProductsGrids(page = null) {
        const params = page ? { page } : {};
        return this.query.get("", { params });
    }

    get productGrid() {
        return this.group("product-grid", (query) => ({
            read: (id) => query.get(`${id}`),
            create: (data) => query.post("", data),
            update(id, data) {
                data.set("_method", "PUT");
                return query.post(`${id}`, data);
            },
            delete: (id, params = {}) => query.delete(id, { params })
        }));
    }
}

export default new ProductsGridsHTTP();
