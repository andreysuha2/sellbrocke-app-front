import Http from "@http";

class OrdersHTTP extends Http {
    constructor() {
        super({ slug: "orders" });
    }

    getOrders(query = null, page = null) {
        const params = {};
        if(query) params.qs = query;
        if(page) params.page = page;
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
