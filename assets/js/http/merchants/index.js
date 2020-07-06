import Http from "@http";

class MerchantsHTTP extends Http {
    constructor() {
        super({ slug: "merchants" });
    }

    loadAll() {
        return this.query.get();
    }
}

export default new MerchantsHTTP();
