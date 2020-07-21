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
            tempDefault: {
                thumbnail: null,
                name: null,
                basePrice: null,
                slug: null,
                company: null,
                categories: [],
                attachCategories: [],
                detachCategories: [],
                description: null
            }
        };
    },
    computed: {
        ...mapGetters("devices/currentDevice", { storeData: "device" }),
        ...mapState("devices/currentDevice", { id: "deviceId" }),
        ...mapState("devices", {
            categoriesList: "categories",
            companiesList: "companies"
        }),
        deviceName() { return this.storeData ? this.storeData.name : null; },
        updateData() { return { id: this.id, data: this.formData }; },
        existingCategories() { return this.storeData.categories.map((category) => category.id); },
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
            get() { return this.temp.category || this.storeData.categories.map((category) => category.id); },
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
        }
    },
    methods: {
        ...mapActions("devices", { updateDevice: "updateDevice" }),
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
                        this.clearForm();
                        resolve(device);
                    }).catch((e) => reject(e));
            });
        }
    }
};
</script>

<style lang="scss" src="@mixins/ControlPopup/main.scss"></style>
