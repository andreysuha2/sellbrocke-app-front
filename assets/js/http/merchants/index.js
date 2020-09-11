import Http from "@http";

class MerchantsHTTP extends Http {
    constructor() {
        super({ slug: "merchants" });
    }

    loadAll() {
        return this.query.get();
    }

    get merchant() {
        return this.group("merchant", (query) => ({
            updatePassword(merchantId, data) {
                data.set("_method", "PUT");
                return query.post(`${merchantId}/update-password`, data);
            }
        }));
    }
}

export default new MerchantsHTTP();
