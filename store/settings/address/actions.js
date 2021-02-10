import Http from "@http/settings";
import { arrayOfObjectsToObject } from "@/store/settings/mixin";

export default {
    fetchAddress({ commit }) {
        return new Promise((resolve, reject) => {
            Http.getAddress()
                .then(response => {
                    const { data } = response.data,
                        formattedData = arrayOfObjectsToObject(data.map(obj => obj.settings));
                    commit("setAddress", formattedData);
                    resolve(formattedData);
                }).catch((e) => reject(e));
        });
    }
};
