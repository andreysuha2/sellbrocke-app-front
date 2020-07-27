<template>
    <md-dialog
        class="display-popup"
        @md-clicked-outside="$emit('closePopup')"
        :md-active="showPopup">
        <md-dialog-title>Device "{{ device.name }}"</md-dialog-title>
        <div class="display-popup--body">
            <div class="display-popup--row">
                <div class="display-popup--cell display-popup--cell__head">
                    <span>Name</span>
                </div>
                <div class="display-popup--cell">{{ device.name }}</div>
            </div>
            <div class="display-popup--row">
                <div class="display-popup--cell display-popup--cell__head">
                    <span>Thumbnail</span>
                </div>
                <div class="display-popup--cell display-popup--cell__image">
                    <img :src="device.thumbnail" alt="">
                </div>
            </div>
            <div class="display-popup--row">
                <div class="display-popup--cell display-popup--cell__head">
                    <span>Company</span>
                </div>
                <nuxt-link
                    class="flex items-center"
                    :to="{ name: 'devices-companies', query: { company: device.company.id } }">
                    <div class="display-popup--cell display-popup--cell__image-small">
                        <img :src="device.company.logo" alt="">
                    </div>
                    <div class="display-popup--cell">
                        <span>{{ device.company.name }}</span>
                    </div>
                </nuxt-link>
            </div>
            <div class="display-popup--row">
                <div class="display-popup--cell display-popup--cell__head">
                    <span>Base price</span>
                </div>
                <div class="display-popup--cell">
                    <span>{{ device.prices.base }}$</span>
                </div>
            </div>
            <div class="display-popup--row">
                <div class="display-popup--cell display-popup--cell__head">
                    <span>Discounted price</span>
                </div>
                <div class="display-popup--cell">
                    <span>{{ device.prices.discounted }}$ ({{ device.company.priceReduction }}%)</span>
                </div>
            </div>
            <div class="display-popup--row">
                <div class="display-popup--cell display-popup--cell__head">
                    <span>Slug</span>
                </div>
                <div class="display-popup--cell">
                    <span>{{ device.slug }}</span>
                </div>
            </div>
            <div class="display-popup--row">
                <div class="display-popup--cell display-popup--cell__head">
                    <span>Categories</span>
                </div>
                <div class="display-popup--cell display-popup--cell__list">
                    <div
                        v-for="category in device.categories"
                        :key="category.id"
                        class="display-popup--cell-list-item">
                        <nuxt-link :to="{ name: 'devices-categories', query: { category: category.id } }">
                            {{ category.name }}
                        </nuxt-link>
                    </div>
                </div>
            </div>
            <template v-if="device.useProductsGrids">
                <div class="display-popup--row">
                    <div class="display-popup--cell display-popup--cell__head">
                        <span>Products grids (carriers)</span>
                    </div>
                    <div class="display-popup--cell display-popup--cell__list">
                        <span
                            v-for="carrier in device.productsGrids.carriers"
                            :key="carrier.id"
                            class="display-popup--cell-list-item">{{ carrier.name }}</span>
                    </div>
                </div>
                <div class="display-popup--row">
                    <div class="display-popup--cell display-popup--cell__head">
                        <span>Products grids (sizes)</span>
                    </div>
                    <div class="display-popup--cell display-popup--cell__list">
                    <span
                        v-for="size in device.productsGrids.sizes"
                        :key="size.id"
                        class="display-popup--cell-list-item">{{ size.name }}</span>
                    </div>
                </div>
            </template>
            <div class="display-popup--row flex-wrap">
                <div class="display-popup--cell display-popup--cell__head">
                    <span>Description</span>
                </div>
                <div class="display-popup--cell">
                    <p>{{ device.description }}</p>
                </div>
            </div>
        </div>
    </md-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    props: {
        showPopup: {
            type: Boolean,
            default: false
        }
    },
    computed: { ...mapGetters("devices/currentDevice", { device: "device" }) }
};
</script>

<style lang="scss">
.display-popup {
    &--body {
        padding: 0 20px;
        padding-bottom: 20px;
        max-width: 600px;
    }

    &--row {
        display: flex;
        align-items: center;

        &:not(:last-child) {
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #cecece;
        }
    }

    &--cell {
        &:not(:last-child) {
            margin-right: 10px;
        }

        &__head {
            font-weight: bold;

            &:after {
                content: ':';
            }
        }

        &__image {
            height: 100px;

            img {
                max-height: 100%;
            }
        }

        &__image-small {
            height: 25px;

            img {
                max-height: 100%;
            }
        }

        &__list {
            display: flex;
            flex-wrap: wrap;
        }
    }

    &--cell-list-item {
        &:not(:last-child) {
            margin-right: 5px;

            &:after {
                content: ',';
            }
        }
    }
}
</style>
