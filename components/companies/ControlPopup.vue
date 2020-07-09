<template>
    <md-dialog
        class="create-company"
        @md-clicked-outside="$emit('closePopup')"
        @md-closed="clearForm"
        :md-active="showPopup">
        <template v-if="hasCompany">
            <md-dialog-title>Control company {{ company.name }}</md-dialog-title>
            <app-form
                ref="updateForm"
                :on-submit="update"
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
                    validate-rules="required"
                    display-error-name="company slug"
                    placeholder="Company slug"/>
                <div class="flex justify-between">
                    <md-button
                        :disabled="!hasUpdate"
                        type="submit"
                        class="md-primary md-raised">Update</md-button>
                    <md-button
                        @click="showDeleteConfirmation = true"
                        class="md-primary md-accent md-raised">Delete</md-button>
                    <md-button
                        @click="$emit('closePopup')"
                        class="md-accent md-raised">Cancel</md-button>
                </div>
            </app-form>
            <md-dialog-confirm
                :md-active.sync="showDeleteConfirmation"
                md-title="Delete company"
                :md-content="`Do you whant remove company ${company.name}?`"
                md-confirm-text="Delete"
                md-cancel-text="Cancel"
                @md-confirm="remove"/>
        </template>
    </md-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { decamelize } from "@helpers/functions";

export default {
    props: {
        showPopup: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formData: null,
            showDeleteConfirmation: false,
            temp: {
                logo: null,
                name: null,
                priceReduction: null,
                slug: null
            }
        };
    },
    computed: {
        ...mapGetters("companies/companyControl", {
            company: "controlledCompany",
            hasCompany: "hasControlled"
        }),
        hasUpdate() {
            return Object.values(this.temp).reduce((has, val) => has || Boolean(val), false);
        },

        //form props
        logo: {
            get() { return this.temp.logo || this.company?.logo; },
            set(logo) {
                if(logo[0]) this.setField("logo", logo[0]);
                else this.clearField("logo");
            }
        },
        name: {
            get() { return this.temp.name || this.company?.name; },
            set(name) { this.setField("name", name); }
        },
        priceReduction: {
            get() { return this.temp.priceReduction || this.company?.priceReduction; },
            set(percent) { this.setField("priceReduction", percent); }
        },
        slug: {
            get() { return this.temp.slug || this.company?.slug; },
            set(slug) { this.setField("slug", slug); }
        }
    },
    methods: {
        ...mapActions("companies", {
            updateCompany: "updateCompany",
            removeCompany: "removeCompany"
        }),
        setField(name, value) {
            if(this.temp.hasOwnProperty(name)) {
                if(value === this.company[name]) this.clearField(name);
                else {
                    this.temp[name] = value;
                    this.formData.set(decamelize(name), value);
                }
            }
        },
        clearField(name, value = null) {
            if(this.temp.hasOwnProperty(name)) {
                this.temp[name] = value;
                this.formData.delete(decamelize(name));
            }
        },
        clearForm() {
            this.temp = {
                logo: null,
                name: null,
                priceReduction: null,
                slug: null
            };
            this.formData = new FormData();
        },
        update() {
            return new Promise((resolve, reject) => {
                this.updateCompany({ id: this.company.id, data: this.formData })
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
            this.removeCompany(this.company.id)
                .then((company) => {
                    this.$notify({
                        title: "Company removed",
                        text: `Company ${company.name} was removed`,
                        duration: 3000
                    });
                    this.$emit("closePopup");
                    this.clearForm();
                })
                .catch((e) => this.$refs.updateForm.handleSubmitErrors(e));
        }
    },
    created() {
        if(process.client) {
            this.formData = new FormData();
        }
    }
};
</script>

<style lang="scss" scoped>
    .create-company /deep/ .md-dialog-container {
        padding: 20px;
        padding-top: 0;
        max-width: 500px;
        width: 100%;
    }
</style>
