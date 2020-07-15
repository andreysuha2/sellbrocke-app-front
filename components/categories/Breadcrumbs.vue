<template>
    <div class="breadcrumbs flex">
        <div :key="item.id" class="flex"
            v-for="item in breadcrumbs">
            <div
                @click="toCategory(item.id)"
                class="breadcrumbs--item">
                <span>{{ item.name }}</span>
            </div>
            <span v-if="item.id !== lastId"
                  class="breadcrumbs--separator">></span>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import NavigatorMixin from "@mixins/categories/Navigator";

export default {
    watch: {
        breadcrumbs(old, n) {
            dl.log(JSON.parse(JSON.stringify(old)), JSON.parse(JSON.stringify(n)));
        }
    },
    mixins: [ NavigatorMixin ],
    computed: {
        ...mapState("categories", [ "breadcrumbs" ]),
        lastId() {
            return this.breadcrumbs[this.breadcrumbs.length - 1].id;
        }
    }
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
    &--item {
        &:not(:last-child) {
            cursor: pointer;
            color: $appColor2;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    &--separator {
        margin: 0 5px;
    }
}
</style>
