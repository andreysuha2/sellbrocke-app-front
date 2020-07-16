<template>
    <div class="category flex justify-between">
        <div class="flex">
            <div class="category--image category-image flex flex-center">
                <img :src="category.thumbnail" alt="">
            </div>
            <div class="category--data category-data flex">
                <div class="category-data--column">
                    <div class="category-data--row">
                        <div class="category-data--head"><span>id</span></div>
                        <div class="category-data--item"><span>{{ category.id }}</span></div>
                    </div>
                    <div class="category-data--row">
                        <div class="category-data--head"><span>name</span></div>
                        <div class="category-data--item"><span>{{ category.name }}</span></div>
                    </div>
                    <div class="category-data--row">
                        <div class="category-data--head"><span>Slug</span></div>
                        <div class="category-data--item"><span>{{ category.slug }}</span></div>
                    </div>
                    <div class="category-data--row">
                        <div class="category-data--head"><span>Description</span></div>
                        <div class="category-data--item"><p>{{ category.description }}</p></div>
                    </div>
                </div>
                <div class="category-data--column">
                    <div class="category-data--row">
                        <div class="category-data--head"><span>Related defects</span></div>
                        <div class="category-data--item"><span>{{ defects }}</span></div>
                    </div>
                    <div class="category-data--row">
                        <div class="category-data--head"><span>Devices count</span></div>
                        <div class="category-data--item"><span>{{ devicesCount }}</span></div>
                    </div>
                    <div class="category-data--row">
                        <div class="category-data--head"><span>Children count</span></div>
                        <div class="category-data--item"><span>{{ childrenCount }}</span></div>
                    </div>
                    <div class="category-data--row">
                        <div class="category-data--head"><span>Descendants count</span></div>
                        <div class="category-data--item"><span>{{ category.descendantsCount }}</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="category--control category-control">
            <md-button
                @click="showUpdatePopup = true"
                class="md-button md-primary md-raised">update</md-button>
            <md-button
                class="md-button md-accent md-raised">delete</md-button>
        </div>
        <update-category
            @closePopup="showUpdatePopup = false"
            :show-popup="showUpdatePopup"/>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { randomNumber } from "@helpers/generators";
import UpdateCategory from "@components/categories/UpdatePopup";

export default {
    data() {
        return { showUpdatePopup: false };
    },
    components: { "update-category": UpdateCategory },
    computed: {
        ...mapState("categories", { category: "currentCategory" }),
        ...mapGetters("categories", { childrenCount: "categoriesCount" }),
        defects() {
            return this.category.defects.map((defect) => defect.name).join(', ');
        },
        devicesCount() {
            return randomNumber(0, 10000);
        }
    }
};
</script>

<style lang="scss" scoped>
.category {
    &--image {
        margin-right: 40px;
    }
}
.category-image {
    max-width: 150px;
}

.category-data {
    &--row {
        display: flex;

        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }

    &--column:not(:last-child) {
        margin-right: 30px;
    }

    &--head {
        font-weight: bold;
        margin-right: 10px;

        &:after {
            content: ':';
        }
    }

    &--item {
        p { margin: 0 }
    }
}
</style>
