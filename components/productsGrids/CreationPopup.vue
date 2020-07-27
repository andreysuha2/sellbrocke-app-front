<template>
    <md-dialog
        class="control-popup"
        @md-closed="clearForm"
        @md-clicked-outside="$emit('closePopup')"
        :md-active="showPopup">
        <md-dialog-title>Create product grid</md-dialog-title>
        <app-form
            :on-submit="create"
            form-name="create-product-grid">
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
                :required="type === 'carrier'"
                accept="image/*"
                validate-name="thumbnail"
                display-error-name="Carrier thumbnail"
                placeholder="Carrier thumbnail"/>
            <app-input
                v-model="name"
                required
                validate-name="name"
                validate-rules="required"
                display-error-name="product grid name"
                placeholder="Product grid name"/>
            <app-input
                v-model="slug"
                required
                validate-name="slug"
                validate-rules="required|alpha_dash"
                display-error-name="slug"
                placeholder="Product grid slug"/>
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
                type: null
            }
        };
    },
    computed: {
        ...mapState("productsGrids", [ "types" ]),
        thumbnail: {
            get() { return this.temp.thumbnail; },
            set(thumbnail) {
                if(thumbnail[0]) this.setField("thumbnail", thumbnail[0]);
                else this.clearField(thumbnail);
            }
        },
        name: {
            get() { return this.temp.name; },
            set(name) { this.setField("name", name); }
        },
        slug: {
            get() { return this.temp.slug; },
            set(slug) { this.setField("slug", slug); }
        },
        type: {
            get() { return this.temp.type; },
            set(type) { this.setField("type", type); }
        }
    },
    methods: {
        ...mapActions("productsGrids", { addProductGrid: "createProductGrid" }),
        create() {
            return new Promise((resolve, reject) => {
                this.addProductGrid(this.formData)
                    .then((productGrid) => {
                        this.$notify({
                            title: `Product grid added`,
                            text: `Product grid "${productGrid.name}" was created`,
                            duration: 3000
                        });
                        this.$emit("closePopup");
                        this.$emit("addProductGrid", productGrid);
                        this.clearForm();
                        resolve(productGrid);
                    }).catch((e) => reject(e));
            });
        }
    }
};
</script>

<style lang="scss" src="@mixins/ControlPopup/main.scss"></style>
