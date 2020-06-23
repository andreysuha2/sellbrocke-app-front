import http from "@http/user";

export default {
    loadUser() {
        return new Promise((resolve, reject) => {
            http.load()
                .then((resp) => {
                    const { user } = resp.data;
                    dl.log(user);
                    resolve(user);
                }).catch(e => reject(e));
        });
    }
}
