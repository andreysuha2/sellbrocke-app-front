export default {
    methods: {
        handleServerErrors(e, title = "Error message") {
            if(e.response && e.response.status === 403 || e.response.status === 422) {
                const { message } = e.response.data;
                if(message) {
                    this.$notify({
                        type: "error",
                        title,
                        text: message
                    });
                }
            }
        }
    }
};
