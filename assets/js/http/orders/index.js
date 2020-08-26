import Http from "@http";

class OrdersHTTP extends Http {
    constructor() {
        super({ slug: "orders" });
    }

    getOrders(page = null) {
        const params = page ? { page } : {};
        return this.query.get("", { params });
    }

    get order() {
        return this.group("order", (query) => ({
            read: (id) => query.get(`${id}`),
            updateStatus: (id, status) => query.put(`${id}/status`, { status })
        }));
    }
}

export default new OrdersHTTP();
