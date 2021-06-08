import Http from "@http";

class CustomersHTTP extends Http {
    constructor() {
        super({ slug: "customers" });
    }

    getCustomers(query = null, page = null) {
        const params = {};
        if(query) params.qs = query;
        if(page) params.page = page;
        return this.query.get("", { params });
    }
}

export default new CustomersHTTP();
