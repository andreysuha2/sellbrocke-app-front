export default {
    methods: {
        handleServerErrors(e, title = "Error message") {
            const defaultMessage = "Something went wrong";
            let message = null;
            if(e.response && (e.response.status === 403 || e.response.status === 422)) {
                message = e.response.data;
            } else {
                dl.error(e);
            }
            if(!message) message = defaultMessage;
            this.$notify({
                type: "error",
                title,
                text: message
            });
        }
    }
};
