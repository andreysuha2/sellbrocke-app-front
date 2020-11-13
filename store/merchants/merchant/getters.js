export default {
    currentMerchant(state, getters, rootState) {
        const merchants = rootState.merchants.list;
        return merchants.find((merchant) => merchant.id === state.merchantId);
    }
};
