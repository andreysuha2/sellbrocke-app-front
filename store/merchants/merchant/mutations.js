export default {
    setMerchant(state, id) {
        state.merchantId = id;
    },
    cancelMerchant(state) {
        state.merchantId = null;
    }
};
