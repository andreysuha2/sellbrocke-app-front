import Http from "@http/settings";
import { arrayOfObjectsToObject } from "@/store/settings/mixin";

export default {
    fetchUps({ commit }) {
        return new Promise((resolve, reject) => {
            Http.getShippingUps()
                .then(response => {
                    const { data } = response.data,
                        formattedData = arrayOfObjectsToObject(data.map(obj => obj.settings));
                    commit("setUps", formattedData);
                    resolve(formattedData);
                }).catch((e) => reject(e));
        });
    }
};
