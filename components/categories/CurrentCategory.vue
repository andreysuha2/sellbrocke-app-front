<template>
    <div class="category flex justify-between">
        <div class="flex">
            <div class="category--image category-image flex flex-center">
                <img :src="category.thumbnail" alt="">
            </div>
            <div class="category--data category-data">
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
                    <div class="category-data--head"><span>Related defects</span></div>
                    <div class="category-data--item"><span>{{ defects }}</span></div>
                </div>
                <div class="category-data--row">
                    <div class="category-data--head"><span>Description</span></div>
                    <div class="category-data--item"><p>{{ category.description }}<p/></div>
                </div>
            </div>
        </div>
        <div class="category--control category-control">
            <md-button
                class="md-button md-primary md-raised">update</md-button>
            <md-button
                class="md-button md-accent md-raised">delete</md-button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState("categories", { category: "currentCategory" }),
        defects() {
            return this.category.defects.map((defect) => defect.name).join(', ');
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
