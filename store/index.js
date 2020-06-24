export default {
    actions: {
        async nuxtServerInit({ dispatch }) {
            await dispatch("user/loadUser");
        }
    }
};
