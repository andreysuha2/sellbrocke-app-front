<template>
    <md-dialog
        class="control-popup"
        @md-closed="clearForm"
        @md-clicked-outside="$emit('closePopup')"
        :md-active="showPopup">
        <md-dialog-title>Update category "{{ storeData.name }}"</md-dialog-title>
        <app-form
            :on-submit="update"
            form-name="update-category">
            <app-file
                v-model="thumbnail"
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
            <app-select
                required
                multiple
                v-model="relatedDefects"
                validate-name="defects"
                validate-rules="required"
                placeholder="Related defects"
                display-error-name="related defects">
                <md-option
                    :key="defect.id"
                    :value="defect.id"
                    v-for="defect in defects">
                    {{ defect.name }}
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
                    class="md-primary md-raised">update</md-button>
                <md-button
                    @click="$emit('closePopup')"
                    class="md-accent md-raised">Cancel</md-button>
            </div>
        </app-form>
    </md-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { listDiff } from "@helpers/functions";
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
                defects: [],
                attachDefects: [],
                detachDefects: []
            }
        };
    },
    computed: {
        ...mapState("categories", {
            defects: "defectsList",
            storeData: "currentCategory",
            parentSlug(state) {
                let slug = state.currentCategory.slug.split("/");
                slug.pop();
                slug = slug.join("/");
                return slug ? `${slug}/` : "";
            }
        }),
        existDefects() {
            return this.storeData.defects.map((defect) => defect.id);
        },
        relatedDefects: {
            get() { return this.temp.defects.length ? this.temp.defects : this.existDefects; },
            set(defects) {
                this.temp.defects = defects;
                const { attached, detached } = listDiff(defects, this.existDefects);
                if(attached) this.setField("attachDefects", attached, true);
                else this.clearField("attachDefects");
                if(detached) this.setField("detachDefects", detached, true);
                else this.clearField("detachDefects");
            }
        },
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
            get() {
                const slug = this.temp.slug || this.storeData.slug;
                return slug.split("/").reverse()[0];
            },
            set(slug) { this.setField("slug", `${this.parentSlug}${slug}`); }
        },
        description: {
            get() { return this.temp.description || this.storeData.description; },
            set(desc) { this.setField("description", desc); }
        }
    },
    methods: {
        ...mapActions("categories", { updateCategory: "updateCategory" }),
        update() {
            return new Promise((resolve, reject) => {
                this.updateCategory(this.formData)
                    .then((category) => {
                        this.$notify({
                            title: `Category updated`,
                            text: `Category ${category.name} was updated`,
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
