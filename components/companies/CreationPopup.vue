<template>
<md-dialog
    class="control-popup"
    @md-clicked-outside="$emit('closePopup')"
    :md-active="showPopup">
    <md-dialog-title>Create company</md-dialog-title>
    <app-form
        :on-submit="create"
        form-name="create-company">
        <app-file
            v-model="logo"
            required
            accept="image/*"
            validate-name="logo"
            display-error-name="company logo"
            placeholder="Company logo"/>
        <app-input
            v-model="name"
            required
            validate-name="name"
            validate-rules="required"
            display-error-name="company name"
            placeholder="Company name"/>
        <app-input
            v-model="priceReduction"
            type="number"
            min="0"
            max="100"
            step=".01"
            required
            validate-name="price_reduction"
            validate-rules="required|decimal:2|between:0,100"
            display-error-name="price reduction"
            placeholder="Price reduction"/>
        <app-input
            v-model="slug"
            required
            validate-name="slug"
            validate-rules="required|alpha_dash"
            display-error-name="company slug"
            placeholder="Company slug"/>
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
                logo: null,
                name: null,
                priceReduction: null,
                slug: null
            }
        };
    },
    computed: {
        logo: {
            get() { return this.temp.logo; },
            set(logo) {
                if(logo[0]) this.setField("logo", logo[0]);
                else this.clearField("logo");
            }
        },
        name: {
            get() { return this.temp.name; },
            set(name) { this.setField("name", name); }
        },
        priceReduction: {
            get() { return this.temp.priceReduction; },
            set(percent) { this.setField("priceReduction", percent); }
        },
        slug: {
            get() { return this.temp.slug; },
            set(slug) { this.setField("slug", slug); }
        }
    },
    methods: {
        ...mapActions("companies", { addCompany: "createCompany" }),
        create() {
            return new Promise((resolve, reject) => {
                this.addCompany(this.formData)
                    .then((company) => {
                        this.$notify({
                            title: `Company added`,
                            text: `Company ${company.name} was created`,
                            duration: 3000
                        });
                        this.$emit("closePopup");
                        this.clearForm();
                        resolve(company);
                    }).catch((e) => reject(e));
            });
        }
    }
};
</script>

<style lang="scss" src="@mixins/ControlPopup/main.scss"></style>
