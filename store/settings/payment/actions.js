import Http from "@http/settings";
import { arrayOfObjectsToObject } from "@/store/settings/mixin";

export default {
    fetchPayment({ commit }) {
        return new Promise((resolve, reject) => {
            Http.getPayment()
                .then(response => {
                    const { data } = response.data,
                        formattedData = arrayOfObjectsToObject(data.map(obj => obj.settings));
                    commit("setPayment", formattedData);
                    resolve(formattedData);
                }).catch((e) => reject(e));
        });
    }
};
