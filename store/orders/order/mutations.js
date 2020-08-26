export default {
    setOrder(state, order) {
        state.order = order;
    },
    clearOrder(state) {
        state.order = null;
    },
    updateOrderStatus(state, { status, log }) {
        state.order.status = status;
        state.order.log = log;
    }
};
