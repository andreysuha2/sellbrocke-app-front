import Http from "@http";

class CompaniesHTTP extends Http {
    constructor() {
        super({ slug: "companies" });
    }

    getAll() {
        return this.query.get();
    }

    isFreeSlug(slug) {
        return this.query.get(`is-free-slug/${slug}`);
    }

    get company() {
        return this.group((query) => ({
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

export default new CompaniesHTTP();
