import Http from "@http/settings";
import { arrayOfObjectsToObject } from "@/store/settings/mixin";


export default {
    fetchFedex({ commit }) {
        return new Promise((resolve, reject) => {
            Http.getShippingFedex()
                .then(response => {
                    const { data } = response.data,
                        formattedData = arrayOfObjectsToObject(data.map(obj => obj.settings));
                    commit("setFedex", formattedData);
                    resolve(formattedData);
                }).catch((e) => reject(e));
        });
    }
};
