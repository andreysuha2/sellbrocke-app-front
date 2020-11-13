<template>
    <md-dialog
        class="control-popup"
        @md-closed="clearForm"
        @md-clicked-outside="$emit('closePopup')"
        :md-active="showPopup">
        <md-dialog-title>Create device</md-dialog-title>
        <app-form
            :on-submit="create"
            form-name="create-device">
            <app-file
                v-model="thumbnail"
                required
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
                    class="md-primary md-raised">Create</md-button>
                <md-button
                    @click="$emit('closePopup')"
                    class="md-accent md-raised">Cancel</md-button>
            </div>
        </app-form>
    </md-dialog>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
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
                slug: null,
                description: null,
                categories: [],
                company: null,
                basePrice: null,
                useProductsGrids: 0,
                productsGrids: []
            }
        };
    },
    computed: {
        ...mapState("devices", {
            companiesList: "companies",
            categoriesList: "categories"
        }),
        ...mapGetters("devices", {
            carriersList: "productsGridsCarriers",
            sizesList: "productsGridsSizes"
        }),
        categories: {
            get() { return this.temp.categories; },
            set(categories) { this.setField("categories", categories, true); }
        },
        basePrice: {
            get() { return this.temp.basePrice; },
            set(price) { this.setField("basePrice", price); }
        },
        thumbnail: {
            get() { return this.temp.thumbnail; },
            set(thumbnail) {
                if(thumbnail[0]) this.setField("thumbnail", thumbnail[0]);
                else this.clearField(thumbnail);
            }
        },
        company: {
            get() { return this.temp.company; },
            set(company) { this.setField("company", company); }
        },
        name: {
            get() { return this.temp.name; },
            set(name) { this.setField("name", name); }
        },
        slug: {
            get() { return this.temp.slug; },
            set(slug) { this.setField("slug", slug); }
        },
        description: {
            get() { return this.temp.description; },
            set(desc) { this.setField("description", desc); }
        },
        useProductsGrids: {
            get() { return Boolean(this.temp.useProductsGrids); },
            set(state) { this.setField("useProductsGrids", Number(state)); }
        },
        productsGridsCarriers: {
            get() { return this.carriers; },
            set(carriers) {
                this.carriers = carriers;
                this.setField("productsGrids", [ ...this.sizes, ...carriers ], true);
            }
        },
        productsGridsSizes: {
            get() { return this.sizes; },
            set(sizes) {
                this.sizes = sizes;
                this.setField("productsGrids", [ ...this.carriers, ...sizes ], true);
            }
        }
    },
    methods: {
        ...mapActions("devices", { addDevice: "createDevice" }),
        create() {
            return new Promise((resolve, reject) => {
                this.addDevice(this.formData)
                    .then((device) => {
                        this.$notify({
                            title: `Device added`,
                            text: `Device ${device.name} was created`,
                            duration: 3000
                        });
                        this.$emit("closePopup");
                        this.$emit("addDevice", device);
                        this.clearForm();
                        resolve(device);
                    }).catch((e) => reject(e));
            });
        }
    }
};
</script>

<style lang="scss" src="@mixins/ControlPopup/main.scss"></style>
