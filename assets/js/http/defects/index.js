import Http from "@http";

class DefectsHTTP extends Http {
    constructor() {
        super({ slug: "defects" });
    }

    getDefects(page = null) {
        const params = page ? { page } : {};
        return this.query.get("", { params });
    }

    get defect() {
        return this.group("defect", (query) => ({
            create: (data) => query.post("", data),
            read: (id) => query.get(`${id}`),
            update(id, data) {
                data.set("_method", "PUT");
                return query.post(`${id}`, data);
            },
            delete: (id, params) => query.delete(`${id}`, { params })
        }));
    }
}

export default new DefectsHTTP();
