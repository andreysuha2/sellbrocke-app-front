import Http from "@http/settings";

export default {
    updateSettings({}, payload) {
        return new Promise((resolve, reject) => {
            Http.getShippingFedex(payload)
                .then(response => {
                    const { data } = response;
                    resolve(data);
                }).catch((e) => reject(e));
        });
    }
};
