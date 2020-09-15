<template>
    <md-dialog
        class="control-popup"
        @md-clicked-outside="closePopup"
        :md-active="showPopup">
        <md-dialog-title>Update device "{{ deviceName }}"</md-dialog-title>
        <app-form
            :on-submit="update"
            form-name="update-device">
            <app-file
                v-model="thumbnail"
                accept="image/*"
                validate-name="thumbnail"
                display-error-name="device thumbnail"
                placeholder="Device thumbnail"/>
            <app-input
                v-model="name"
                required
                validate-name="name"
                validate-rules="required"
                display-error-name="device name"
                placeholder="Device name"/>
            <app-input
                v-model="basePrice"
                required
                type="number"
                min="1"
                step="0.01"
                validate-name="base_price"
                validate-rules="required|decimal:2|min:1"
                display-error-name="base price"
                placeholder="Device base price"/>
            <app-input
                v-model="slug"
                required
                validate-name="slug"
                validate-rules="required|alpha_dash"
                display-error-name="slug"
                placeholder="Device slug"/>
            <app-select
                required
                v-model="company"
                validate-name="company"
                validate-rules="required"
                placeholder="Device company"
                display-error-name="company">
                <md-option
                    :key="company.id"
                    :value="company.id"
                    v-for="company in companiesList">
                    {{ company.name }}
                </md-option>
            </app-select>
            <app-select
                required
                multiple
                v-model="categories"
                validate-name="categories"
                validate-rules="required"
                placeholder="Categories"
                display-error-name="categories">
                <md-option
                    :key="category.id"
                    :value="category.id"
                    v-for="category in categoriesList">
                    {{ category.name }}
                </md-option>
            </app-select>
            <md-checkbox v-model="useProductsGrids" class="md-primary">Use products grids</md-checkbox>
            <template v-if="useProductsGrids">
                <app-select
                    required
                    multiple
                    v-model="productsGridsCarriers"
                    validate-name="products-grids-carriers"
                    validate-rules="required"
                    placeholder="Products grids carriers"
                    display-error-name="Products grids carrier">
                    <md-option
                        :key="carrier.id"
                        :value="carrier.id"
                        v-for="carrier in carriersList">
                        {{ carrier.name }}
                    </md-option>
                </app-select>
                <app-select
                    required
                    multiple
                    v-model="productsGridsSizes"
                    validate-name="products-grids-sizes"
                    validate-rules="required"
                    placeholder="Products grids sizes"
                    display-error-name="Products grids sizes">
                    <md-option
                        :key="size.id"
                        :value="size.id"
                        v-for="size in sizesList">
                        {{ size.name }}
                    </md-option>
                </app-select>
            </template>
            <app-textarea
                v-model="description"
                validate-name="description"
                validate-rules=""
                display-error-name="company description"
                placeholder="Device description"/>
            <div class="flex justify-between">
                <md-button
                    type="submit"
                    class="md-primary md-raised">Update</md-button>
                <md-button
                    @click="$emit('closePopup')"
                    class="md-accent md-raised">Cancel</md-button>
            </div>
        </app-form>
    </md-dialog>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { listDiff } from "@helpers/functions";
import popupMixin from "@mixins/ControlPopup";

export default {
    mixins: [ popupMixin ],
    data() {
        return {
            carriers: [],
            sizes: [],
            tempDefault: {
                thumbnail: null,
                name: null,
                basePrice: null,
                slug: null,
                company: null,
                useProductsGrids: null,
                categories: [],
                attachCategories: [],
                detachCategories: [],
                description: null,
                productsGrids: []
            }
        };
    },
    computed: {
        ...mapGetters("devices/currentDevice", { storeData: "device" }),
        ...mapGetters("devices", {
            carriersList: "productsGridsCarriers",
            sizesList: "productsGridsSizes"
        }),
        ...mapState("devices/currentDevice", { id: "deviceId" }),
        ...mapState("devices", {
            categoriesList: "categories",
            companiesList: "companies"
        }),
        deviceName() { return this.storeData ? this.storeData.name : null; },
        updateData() { return { id: this.id, data: this.formData }; },
        existingCategories() { return this.storeData.categories.map((category) => category.id); },
        storeCarriers() { return this.getStoreProductsGrids("carriers"); },
        storeSizes() { return this.getStoreProductsGrids("sizes"); },
        // form props
        thumbnail: {
            get() { return this.temp.thumbnail || this.storeData.thumbnail; },
            set(thumbnail) {
                if(thumbnail[0]) this.setField("thumbnail", thumbnail[0]);
                else this.clearField(thumbnail);
            }
        },
        name: {
            get() { return this.temp.name || this.storeData.name; },
            set(name) { this.setField("name", name); }
        },
        basePrice: {
            get() { return this.temp.basePrice || this.storeData.prices.base; },
            set(price) { this.setField("basePrice", price); }
        },
        slug: {
            get() { return this.temp.slug || this.storeData.slug; },
            set(slug) { this.setField("slug", slug); }
        },
        company: {
            get() { return this.temp.company || this.storeData.company.id; },
            set(companyId) { this.setField("company", companyId); }
        },
        categories: {
            get() {
                const hasCategories = this.temp.categories.length;
                return hasCategories ? this.temp.categories : this.existingCategories;
            },
            set(categories) {
                this.temp.categories = categories;
                const { attached, detached } = listDiff(categories, this.existingCategories);
                if(attached) this.setField("attachCategories", attached, true);
                else this.clearField("attachCategories");
                if(detached) this.setField("detachCategories", detached, true);
                else this.clearField("detachCategories");
            }
        },
        description: {
            get() { return this.temp.description !== null ? this.temp.description : this.storeData.description; },
            set(desc) { this.setField("description", desc); }
        },
        useProductsGrids: {
            get() {
                const tempUse = this.temp.useProductsGrids,
                    storeUse = this.storeData.useProductsGrids;
                return Boolean(tempUse !== null ? tempUse : storeUse);
            },
            set(state) { this.setField("useProductsGrids", Number(state)); }
        },
        productsGridsCarriers: {
            get() {
                const hasCarriers = this.carriers.length;
                return hasCarriers || !this.storeCarriers ? this.carriers : this.storeCarriers;
            },
            set(carriers) {
                this.carriers = carriers;
                this.setField("productsGrids", [ ...this.sizes, ...carriers ], true);
            }
        },
        productsGridsSizes: {
            get() {
                const hasSizes = this.sizes.length;
                return hasSizes || !this.storeCarriers ? this.sizes : this.storeSizes;
            },
            set(sizes) {
                this.sizes = sizes;
                this.setField("productsGrids", [ ...this.carriers, ...sizes ], true);
            }
        }
    },
    methods: {
        ...mapActions("devices", { updateDevice: "updateDevice" }),
        getStoreProductsGrids(type) {
            if(!this.storeData.productsGrids) return null;
            return this.storeData.productsGrids[type].map((grid) => grid.id);
        },
        closePopup() {
            this.$emit("closePopup");
            this.clearForm();
        },
        update() {
            return new Promise((resolve, reject) => {
                this.updateDevice(this.updateData)
                    .then((device) => {
                        this.$notify({
                            title: `Device updated`,
                            text: `Device ${device.name} was updated`,
                            duration: 3000
                        });
                        this.$emit("closePopup");
                        this.$emit("updateDevice", device);
                        this.clearForm();
                        resolve(device);
                    }).catch((e) => reject(e));
            });
        }
    }
};
</script>

<style lang="scss" src="@mixins/ControlPopup/main.scss"></style>
