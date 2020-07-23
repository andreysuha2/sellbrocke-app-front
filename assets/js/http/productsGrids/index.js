import Http from "@http";

class ProductsGridsHTTP extends Http {
    constructor() {
        super({ slug: "products-grids" });
    }

    getProductsGrids() {
        return this.query.get();
    }

    get productGrid() {
        return this.group("product-grid", (query) => ({
            read: (id) => query.get(`${id}`),
            create: (data) => query.post("", data),
            update(id, data) {
                data.set("_method", "PUT");
                return query.post(`${id}`, data);
            },
            delete: (id) => query.delete(id)
        }));
    }
}

export default new ProductsGridsHTTP();
