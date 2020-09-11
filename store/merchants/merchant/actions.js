import Http from "@http/merchants";
const http = Http.merchant;

export default {
    updatePassword({ state }, data) {
        return new Promise((resolve, reject) => {
            const id = state.merchantId;
            http.updatePassword(id, data)
                .then((resp) => resolve(resp))
                .catch((e) => reject(e));
        });
    }
};
