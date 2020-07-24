<template>
    <md-dialog
        class="control-popup"
        @md-clicked-outside="closePopup"
        :md-active="showPopup">
        <md-dialog-title>Update product grid "{{ productGridName }}"</md-dialog-title>
        <app-form
            v-if="storeData"
            :on-submit="update"
            form-name="update-product-grid">
            <app-select
                required
                v-model="type"
                validate-name="type"
                validate-rules="required"
                placeholder="Product grid type"
                display-error-name="product grid type">
                <md-option
                    :key="type.key"
                    :value="type.value"
                    v-for="type in types">
                    {{ type.name }}
                </md-option>
            </app-select>
            <app-file
                v-if="type === 'carrier'"
                v-model="thumbnail"
                accept="image/*"
                validate-name="thumbnail"
                display-error-name="carrier thumbnail"
                placeholder="Carrier thumbnail"/>
            <app-input
                v-model="name"
                required
                validate-name="name"
                validate-rules="required"
                display-error-name="Product grid name"
                placeholder="Product grid name"/>
            <app-input
                v-model="slug"
                required
                validate-name="slug"
                validate-rules="required|alpha_dash"
                display-error-name="product grid slug"
                placeholder="Product grid slug"/>
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
import popupMixin from "@mixins/ControlPopup";

export default {
    mixins: [ popupMixin ],
    data() {
        return {
            tempDefault: {
                thumbnail: null,
                name: null,
                slug: null,
                type: null
            }
        };
    },
    computed: {
        ...mapGetters("productsGrids/currentProductGrid", { storeData: "currentProductGrid" }),
        ...mapState("productsGrids/currentProductGrid", { id: "productGridId" }),
        ...mapState("productsGrids", { types: "types" }),
        productGridName() { return this.storeData ? this.storeData.name : null; },
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
        slug: {
            get() { return this.temp.slug || this.storeData.slug; },
            set(slug) { this.setField("slug", slug); }
        },
        type: {
            get() { return this.temp.type || this.storeData.type; },
            set(type) {
                if(type === "size") this.clearField("thumbnail");
                this.setField("type", type);
            }
        }
    },
    methods: {
        ...mapActions("productsGrids", { updateProductGrid: "updateProductGrid" }),
        closePopup() {
            this.$emit("closePopup");
            this.clearForm();
        },
        update() {
            return new Promise((resolve, reject) => {
                this.updateProductGrid(this.updateData)
                    .then((productGrid) => {
                        this.$notify({
                            title: `Product grid updated`,
                            text: `Product grid "${productGrid.name}" was updated`,
                            duration: 3000
                        });
                        this.$emit("closePopup");
                        this.$emit("updateProductGrid", productGrid);
                        this.clearForm();
                        resolve(productGrid);
                    }).catch((e) => reject(e));
            });
        }
    }
};
</script>

<style lang="scss" src="@mixins/ControlPopup/main.scss"></style>
