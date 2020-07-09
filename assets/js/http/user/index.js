import Http from "@http";

class ApiUserHTTP extends Http {
    constructor() {
        super({ slug: "user" });
    }

    load() {
        return this.query.get();
    }
}

export default new ApiUserHTTP();
