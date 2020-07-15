export default {
    methods: {
        toCategory(id) {
            this.$router.push({
                name: "devices-categories",
                query: { ...this.$route.query, "category": id || undefined }
            });
        }
    }
};
