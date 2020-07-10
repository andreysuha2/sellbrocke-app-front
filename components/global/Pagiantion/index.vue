<template>
    <div v-if="totalPages > 1" class="app-pagination flex items-center">
        <md-button
            v-if="displayArrow.prev"
            :disabled="isFirstPage"
            class="md-button md-primary md-raised app-paginate--arrow app-paginate--arrow__prev">
            {{ prevBtnText }}
        </md-button>
        <div class="app-paginate--pages flex items-end">
            <div v-for="page in pagesList"
                 :key="page.key"
                 class="app-paginate--page">
                <span v-if="page.num === 'dots'" class="app-paginate--dots">...</span>
                <md-button v-else
                        @click="changePage(page.num)"
                        :class="{ 'md-raised md-primar': page.current }"
                        :disabled="page.current"
                        class="md-button-icon app-paginate--page-link">{{ page.num }}</md-button>
            </div>
        </div>
        <md-button
            v-if="displayArrow.next"
            :disabled="isLastPage"
            class="md-button md-primary md-raised app-paginate--arrow app-paginate--arrow__next">
            {{ nextBtnText }}
        </md-button>
    </div>
</template>

<script>
import { genKey } from "@helpers/generators";

export default {
    props: {
        currentPage: {
            type: Number,
            default: 1
        },
        totalPages: {
            type: Number,
            default: 1
        },
        maxDisplayed: {
            type: Number,
            default: 10
        },
        pageName: {
            type: String,
            default: "page"
        },
        prevBtnText: {
            type: String,
            default: "Prev"
        },
        nextBtnText: {
            type: String,
            default: "Next"
        },
        alwaysArrows: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        displayArrow() {
            return {
                prev: this.alwaysArrows || !this.isFirstPage,
                next: this.alwaysArrows || !this.isLastPage
            };
        },
        isFirstPage() {
            return this.currentPage === 1;
        },
        isLastPage() {
            return this.currentPage === this.totalPages;
        },
        pagesList() {
            const pages = [],
                maxDisplay = this.maxDisplayed - 2,
                maxDisplayOffset = Math.floor(maxDisplay / 2),
                offset = {
                    left: this.currentPage - maxDisplayOffset,
                    right: this.currentPage + maxDisplayOffset
                };
            let lastInsert = null;
            for(let i = 0; i < this.totalPages; i++) {
                const num = i + 1;
                if(num === 1 || num === this.totalPages || num > offset.left && num < offset.right) {
                    pages.push({ num, key: genKey("PAGINATE_PAGE"), current: num === this.currentPage });
                    lastInsert = "page";
                } else if(lastInsert === "page") {
                    pages.push({ num: "dots", key: genKey("PAGINATE_DOTS") });
                    lastInsert = "dots";
                }
            }
            return pages;
        }
    },
    methods: {
        changePage(num) {
            if(num === this.currentPage) return;
            const name = this.$route.name;
            this.$router.push({
                name,
                query: {
                    ...this.$route.query,
                    [this.pageName]: num
                }
            });
            this.$emit("changePage", num);
        },
        next() {
            if(!this.isLastPage) this.changePage(this.currentPage + 1);
        },
        prev() {
            if(!this.isFirstPage) this.changePage(this.currentPage + 1);
        }
    }
};
</script>

<style lang="scss" scoped>
.app-paginate {
    &--arrow {
        cursor: pointer;

        &__prev {
            margin-right: 15px;
        }

        &__next {
            margin-left: 15px;
        }
    }

    &--page {
        &:not(:last-child) {
            margin-right: 5px;
        }

        &:not(:first-child) {
            margin-left: 5px;
        }

        &-link {
            min-width: 40px;
        }
    }
}
</style>
