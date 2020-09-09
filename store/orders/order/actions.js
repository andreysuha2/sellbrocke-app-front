import Http from "@http/orders";
const http = Http.order;

export default {
    getOrder({ commit }, id) {
        return new Promise((resolve, reject) => {
            http.read(id)
                .then((resp) => {
                    const { order } = resp.data;
                    commit("setOrder", order);
                    resolve(order);
                }).catch((e) => reject(e));
        });
    },
    updateStatus({ commit, state }, status) {
        return new Promise((resolve, reject) => {
            const { id } = state.order;
            http.updateStatus(id, status)
                .then((resp) => {
                    const { order } = resp.data,
                        oldStatus = state.order.status;
                    commit("updateOrderStatus", order);
                    resolve({ status: order.status, oldStatus });
                }).catch((e) => reject(e));
        });
    }
};
