import Http from "@http";

class ApiUserHTTP extends Http {
    constructor() {
        super({ slug: "user" });
    }

    load() {
        return this.query.get();
    }

    update(data) {
        data.set("_method", "PUT");
        return this.query.post("", data);
    }
}

export default new ApiUserHTTP();
