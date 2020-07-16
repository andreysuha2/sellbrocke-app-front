<template>
    <app-page class="categories" title="Categories">
        <template #header>
            <md-button
                @click="showCreatePopup = true"
                class="md-button md-primary md-raised">Add new</md-button>
        </template>
        <md-empty-state
            v-if="isEmpty"
            md-icon="view_list"
            md-label="Create your first category"
            md-description="You cant create devices without category">
            <md-button
                @click="showCreatePopup = true"
                class="md-primary md-raised">Create category</md-button>
        </md-empty-state>
        <template v-else>
            <categories-breadcrumbs
                class="categories--breadcrumbs"/>
            <current-category v-if="isSelectCategory"
                class="categories--current"/>
            <md-table v-if="hasCategories" class="categories-list">
                <md-table-row>
                    <md-table-head class="categories-list--id" md-numeric>ID</md-table-head>
                    <md-table-head>Thumbnail</md-table-head>
                    <md-table-head>Name</md-table-head>
                    <md-table-head>Related defects</md-table-head>
                    <md-table-head>Description</md-table-head>
                    <md-table-head>Controls</md-table-head>
                </md-table-row>
                <md-table-row v-for="category in categories" :key="category.id">
                    <md-table-cell class="categories-list--id" md-numeric>{{ category.id }}</md-table-cell>
                    <md-table-cell>
                        <div class="categories-list--image">
                            <img :src="category.thumbnail" alt="">
                        </div>
                    </md-table-cell>
                    <md-table-cell>{{ category.name }}</md-table-cell>
                    <md-table-cell>
                        <span class="categories-list--defect" v-for="defect in category.defects"
                            :key="`${category.id}.${defect.id}`">{{ defect.name }}</span>
                    </md-table-cell>
                    <md-table-cell>{{ category.description }}</md-table-cell>
                    <md-table-cell>
                        <md-button
                            @click="toCategory(category.id)"
                            class="categories-list--control md-icon-button md-raised">
                            <md-icon>edit</md-icon>
                        </md-button>
                        <md-button
                            class="categories-list--control md-icon-button md-raised">
                            <md-icon>delete</md-icon>
                        </md-button>
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </template>
        <create-category
            @closePopup="showCreatePopup = false"
            :show-popup="showCreatePopup"/>
    </app-page>
</template>

<script>
import CreationPopup from "@components/categories/CreationPopup";
import Breadcrumbs from "@components/categories/Breadcrumbs";
import CurrentCategory from "@components/categories/CurrentCategory";
import NavigatorMixin from "@mixins/categories/Navigator";
import { mapState, mapGetters } from "vuex";

export default {
    mixins: [ NavigatorMixin ],
    async fetch({ store, route, redirect }) {
        try {
            const { category } = route.query;
            if(category) await store.dispatch("categories/loadCategory", { id: category, withDefects: true });
            else await store.dispatch("categories/loadRootCategories");
        } catch (e) {
            dl.error(e);
            if(e.response && e.response.status === 404) redirect({ name: "devices-categories" });
        }
    },
    watchQuery: [ "category" ],
    components: {
        "create-category": CreationPopup,
        "categories-breadcrumbs": Breadcrumbs,
        "current-category": CurrentCategory
    },
    data() {
        return { showCreatePopup: false };
    },
    computed: {
        ...mapState("categories", {
            categories: "categories",
            category: "currentCategory"
        }),
        ...mapGetters("categories", {
            hasCategories: "hasCategories",
            isSelectCategory: "isCategorySelected",
            isEmpty: "isEmpty"
        })
    }
};
</script>

<style lang="scss" scoped>
    .categories {
        &--breadcrumbs {
            margin-bottom: 30px;
        }

        &--current {
            margin-bottom: 40px;
        }
    }

    .categories-list {
        &--id {
            width: 100px;
        }

        &--image {
            max-width: 40px;
        }

        &--control:not(:last-child) {
            margin-right: 10px;
        }

        &--defect {
            &:not(:last-child) {
                margin-right: 5px;

                &:after {
                    content: ',';
                }
            }
        }
    }
</style>
