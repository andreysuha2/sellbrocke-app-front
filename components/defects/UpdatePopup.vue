<template>
    <md-dialog
        class="update-defect"
        @md-clicked-outside="closePopup"
        :md-active="showPopup">
        <md-dialog-title>Update defect "{{ defectName }}"</md-dialog-title>
        <app-form
            v-if="defect"
            :on-submit="update"
            form-name="update-defect">
            <app-input
                v-model="name"
                required
                validate-name="name"
                validate-rules="required"
                display-error-name="defect name"
                placeholder="Defect name"/>
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
            <app-textarea
                v-model="description"
                validate-name="description"
                validate-rules=""
                display-error-name="company slug"
                placeholder="Defect description"/>
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
            temp: {
                name: null,
                priceReduction: null,
                description: null
            }
        };
    },
    computed: {
        ...mapGetters("defects/currentDefect", { defect: "currentDefect" }),
        ...mapState("defects/currentDefect", { id: "defectId" }),
        defectName() { return this.defect ? this.defect.name : null; },
        updateData() { return { id: this.id, data: this.formData }; },
        // form props
        name: {
            get() { return this.temp.name ? this.temp.name : this.defect.name; },
            set(name) { this.setField("name", name); }
        },
        priceReduction: {
            get() { return this.temp.priceReduction ? this.temp.priceReduction : this.defect.priceReduction; },
            set(percent) { this.setField("priceReduction", percent); }
        },
        description: {
            get() { return this.temp.description !== null ? this.temp.description : this.defect.description; },
            set(desc) { this.setField("description", desc); }
        }
    },
    methods: {
        ...mapActions("defects", { updateDefect: "updateDefect" }),
        setField(name, value) {
            if(value === this.defect[name]) this.clearField(name);
            else {
                this.temp[name] = value;
                this.formData.set(decamelize(name), value);
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
                name: null,
                priceReduction: null,
                description: null
            };
            this.formData = new FormData();
        },
        closePopup() {
            this.$emit("closePopup");
            this.clearForm();
        },
        update() {
            return new Promise((resolve, reject) => {
                this.updateDefect(this.updateData)
                    .then((defect) => {
                        this.$notify({
                            title: `Defect updated`,
                            text: `Defect ${defect.name} was updated`,
                            duration: 3000
                        });
                        this.$emit("closePopup");
                        this.clearForm();
                        resolve(defect);
                    }).catch((e) => reject(e));
            });
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
    .update-defect /deep/ .md-dialog-container {
        padding: 20px;
        padding-top: 0;
        max-width: 500px;
        width: 100%;
    }
</style>
