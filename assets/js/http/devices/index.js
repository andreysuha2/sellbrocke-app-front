import Http from "@http";

class DevicesHTTP extends Http {
    constructor() {
        super({ slug: "devices" });
    }

    getDevices(page = null) {
        let params = {};
        if(page) params.page = page;
        return this.query.get("", { params });
    }

    get device() {
        return this.group("device", (query) => ({
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

export default new DevicesHTTP();
