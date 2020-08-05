<template>
    <md-dialog
        class="control-popup"
        @md-clicked-outside="$emit('closePopup')"
        @md-closed="clearForm"
        :md-active="showPopup">
        <template v-if="hasCompany">
            <md-dialog-title>Control company {{ storeData.name }}</md-dialog-title>
            <app-form
                ref="updateForm"
                :on-submit="update"
                form-name="control-company">
                <app-file
                    v-model="logo"
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
                    v-model.number="priceReduction"
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
                        :disabled="!hasUpdate"
                        type="submit"
                        class="md-primary md-raised">Update</md-button>
                    <md-button
                        @click="showDeleteConfirmation = true"
                        :disabled="Boolean(storeData.devicesCount)"
                        class="md-primary md-accent md-raised">Delete</md-button>
                    <md-button
                        @click="$emit('closePopup')"
                        class="md-accent md-raised">Cancel</md-button>
                </div>
            </app-form>
            <md-dialog-confirm
                :md-active.sync="showDeleteConfirmation"
                md-title="Delete company"
                :md-content="`Do you whant remove company ${storeData.name}?`"
                md-confirm-text="Delete"
                md-cancel-text="Cancel"
                @md-confirm="remove"/>
        </template>
    </md-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import popupMixin from "@mixins/ControlPopup";

export default {
    mixins: [ popupMixin ],
    data() {
        return {
            showDeleteConfirmation: false,
            tempDefault: {
                logo: null,
                name: null,
                priceReduction: null,
                slug: null
            }
        };
    },
    computed: {
        ...mapGetters("companies/companyControl", {
            storeData: "controlledCompany",
            hasCompany: "hasControlled"
        }),

        //form props
        logo: {
            get() { return this.temp.logo || this.storeData?.logo; },
            set(logo) {
                if(logo[0]) this.setField("logo", logo[0]);
                else this.clearField("logo");
            }
        },
        name: {
            get() { return this.temp.name || this.storeData?.name; },
            set(name) { this.setField("name", name); }
        },
        priceReduction: {
            get() { return this.temp.priceReduction || this.storeData?.priceReduction; },
            set(percent) { this.setField("priceReduction", percent); }
        },
        slug: {
            get() { return this.temp.slug || this.storeData?.slug; },
            set(slug) { this.setField("slug", slug); }
        }
    },
    methods: {
        ...mapActions("companies", {
            updateCompany: "updateCompany",
            removeCompany: "removeCompany"
        }),
        update() {
            return new Promise((resolve, reject) => {
                this.updateCompany({ id: this.storeData.id, data: this.formData })
                    .then((company) => {
                        this.$notify({
                            title: `Company update`,
                            text: `Company ${company.name} was updated`,
                            duration: 3000
                        });
                        this.$emit("closePopup");
                        this.clearForm();
                        resolve(company);
                    }).catch((e) => reject(e));
            });
        },
        remove() {
            this.removeCompany(this.storeData.id)
                .then((company) => {
                    this.$notify({
                        title: "Company removed",
                        text: `Company ${company.name} was removed`,
                        duration: 3000
                    });
                    this.$emit("closePopup");
                    this.clearForm();
                })
                .catch((e) => this.handleServerErrors(e, "Delete defect error"));
        }
    }
};
</script>

<style lang="scss" src="@mixins/ControlPopup/main.scss"></style>
