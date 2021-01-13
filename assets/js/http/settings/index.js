import Http from "@http";

class SettingsHTTP extends Http {
    constructor() {
        super({ slug: "settings" });
    }

    get settingsStore() {
        return this.group('store', (query) => ({ update: (data) => query.post('', data) }));
    }

    getCommon() {
        return this.query.get('common');
    }

    getAddress() {
        return this.query.get('address');
    }

    getPayment() {
        return this.query.get('payment');
    }

    getShippingFedex() {
        return this.query.get('fedex');
    }

    getShippingUps() {
        return this.query.get('ups');
    }
}

export default new SettingsHTTP();
