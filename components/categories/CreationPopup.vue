<template>
    <md-dialog
        class="control-popup"
        @md-clicked-outside="$emit('closePopup')"
        :md-active="showPopup">
        <md-dialog-title>Create category</md-dialog-title>
        <app-form
            :on-submit="create"
            form-name="create-category">
            <app-file
                v-model="thumbnail"
                required
                accept="image/*"
                validate-name="thumbnail"
                display-error-name="category thumbnail"
                placeholder="Category thumbnail"/>
            <app-input
                v-model="name"
                required
                validate-name="name"
                validate-rules="required"
                display-error-name="category name"
                placeholder="Category name"/>
            <app-input
                v-model="slug"
                required
                validate-name="slug"
                validate-rules="required|alpha_dash"
                display-error-name="slug"
                placeholder="Category slug"/>
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
import { mapActions } from "vuex";
import popupMixin from "@mixins/ControlPopup";

export default {
    mixins: [ popupMixin ],
    data() {
        return {
            temp: {
                thumbnail: null,
                name: null,
                slug: null,
                description: null
            }
        };
    },
    computed: {
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
        description: {
            get() { return this.temp.description; },
            set(desc) { this.setField("description", desc); }
        }
    },
    methods: {
        ...mapActions("categories", { addCategory: "createCategory" }),
        create() {
            return new Promise((resolve, reject) => {
                this.addCategory({ data: this.formData })
                    .then((category) => {
                        this.$notify({
                            title: `Category added`,
                            text: `Category ${category.name} was created`,
                            duration: 3000
                        });
                        this.$emit("closePopup");
                        this.clearForm();
                        resolve(category);
                    }).catch((e) => reject(e));
            });
        }
    }
};
</script>

<style lang="scss" src="@mixins/ControlPopup/main.scss"></style>
