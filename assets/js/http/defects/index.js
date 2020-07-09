import Http from "@http";

class DefectsHTTP extends Http {
    constructor() {
        super({ slug: "defects" });
    }

    getDefects() {
        return this.query.get();
    }

    get defect() {
        return this.group("defect", (query) => ({
            create: (data) => query.post("", data),
            read: (id) => query.get(`${id}`),
            update(id, data) {
                data.set("_method", "PUT");
                return query.post(`${id}`, data);
            },
            delete: (id) => query.delete(`${id}`)
        }));
    }
}

export default new DefectsHTTP();
