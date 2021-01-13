import Http from "@http/settings";
import { arrayOfObjectsToObject } from "@/store/settings/mixin";

export default {
    fetchCommon({ commit }) {
        return new Promise((resolve, reject) => {
            Http.getCommon()
                .then(response => {
                    const { data } = response.data,
                        formattedData = arrayOfObjectsToObject(data.map(obj => obj.settings));

                    commit("setCommon", formattedData);
                    resolve(formattedData);
                })
                .catch((e) => reject(e));
        });
    }
};
