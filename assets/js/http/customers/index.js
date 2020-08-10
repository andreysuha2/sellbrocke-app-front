import Http from "@http";

class CustomersHTTP extends Http {
    constructor() {
        super({ slug: "customers" });
    }

    getCustomers(page = null) {
        let params = {};
        if(page) params.page = page;
        return this.query.get("", { params });
    }
}

export default new CustomersHTTP();
