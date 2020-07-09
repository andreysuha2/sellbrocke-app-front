import Http from "@http";

class AuthHTTP extends Http {
    constructor() {
        super({ slug: "auth" });
    }

    authorize(data) {
        return this.query.put("", data);
    }

    logout() {
        return this.query.put("logout");
    }

    check() {
        return this.query.get("check");
    }
}

export default new AuthHTTP();
