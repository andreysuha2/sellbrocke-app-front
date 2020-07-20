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
            <app-textarea
                v-model="description"
                validate-name="description"
                validate-rules=""
                display-error-name="company description"
                placeholder="Category description"/>
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
import { mapActions, mapState } from "vuex";
import popupMixin from "@mixins/ControlPopup";

export default {
    mixins: [ popupMixin ],
    data() {
        return {
            tempDefault: {
                thumbnail: null,
                name: null,
                slug: null,
                description: null,
                categories: [],
                company: null,
                basePrice: null
            }
        };
    },
    computed: {
        ...mapState("devices", {
            companiesList: "companies",
            categoriesList: "categories"
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
                        this.clearForm();
                        resolve(device);
                    }).catch((e) => reject(e));
            });
        }
    }
};
</script>

<style lang="scss" src="@mixins/ControlPopup/main.scss"></style>
