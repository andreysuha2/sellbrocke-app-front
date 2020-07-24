export default {
    enableProductGrid(state, id) {
        state.productGridId = id;
    },
    disableProductGrid(state) {
        state.productGridId = null;
    }
};
