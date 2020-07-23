import { mapMutations, mapState, mapGetters } from "vuex";

export default {
    watchQuery: [ "page" ],
    data() {
        return { pagePaginationId: null };
    },
    computed: {
        ...mapState("app/pagePagination", {
            pagination: "pagination",
            currentPaginationId: "id",
            totalItems: (state) => state.pagination?.total
        }),
        ...mapGetters("app/pagePagination", [ "hasItems" ]),
        hasPages() {
            return this.pagination ? this.totalItems > this.pagination.perPage : null;
        },
        isCurrentPaginateItems() {
            return this.pagePaginationId === this.currentPaginationId;
        }
    },
    methods: {
        ...mapMutations("app/pagePagination", {
            clearPaginate: "clearPagination",
            setPaginateItems: "setItems",
            createPaginateItem: "addItem",
            updatePaginateItem: "updateItem",
            deletePaginateItem: "deleteItem",
            addNextPaginateItem: "addNextItem",
            recalculatePagination: "recalculatePagination"
        }),
        redirectFromLastEmptyPage() {
            const currentPage = this.$route.query.page;
            if(currentPage && Number(currentPage) > this.pagination.lastPage) {
                const { name } = this.$route;
                this.$router.push({ name, query: { ...this.$route.query, page: this.pagination.lastPage } });
            }
        },
        addPaginateItem(item) {
            if(this.pagination.currentPage === 1) {
                this.createPaginateItem(item);
                this.recalculatePagination(1);
            }
        },
        removePaginateItem(id, nextItem) {
            this.deletePaginateItem(id);
            if(nextItem) this.addNextPaginateItem(nextItem);
            this.recalculatePagination(-1);
            this.redirectFromLastEmptyPage();
        }
    },
    beforeCreate() {
        dl.log("test");
    },
    created() {
        this.pagePaginationId = this.currentPaginationId;
    },
    beforeRouteLeave(to, from, next) {
        if(this.currentPaginationId === this.pagePaginationId) {
            this.clearPaginate();
        }
        next();
    }
};
