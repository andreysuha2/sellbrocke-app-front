<template>
    <md-dialog
        class="control-popup"
        @md-clicked-outside="$emit('closePopup')"
        :md-active="showPopup">
        <md-dialog-title>Create defect</md-dialog-title>
        <app-form
            :on-submit="create"
            form-name="create-defect">
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
                display-error-name="defect description"
                placeholder="Defect description"/>
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
            tempDefault: {
                name: null,
                priceReduction: null,
                description: null
            }
        };
    },
    computed: {
        name: {
            get() { return this.temp.name; },
            set(name) { this.setField("name", name); }
        },
        priceReduction: {
            get() { return this.temp.priceReduction; },
            set(percent) { this.setField("priceReduction", percent); }
        },
        description: {
            get() { return this.temp.description; },
            set(desc) { this.setField("description", desc); }
        }
    },
    methods: {
        ...mapActions("defects", { addDefect: "createDefect" }),
        create() {
            return new Promise((resolve, reject) => {
                this.addDefect(this.formData)
                    .then((defect) => {
                        this.$notify({
                            title: `Defect added`,
                            text: `Defect ${defect.name} was created`,
                            duration: 3000
                        });
                        this.$emit("closePopup");
                        this.clearForm();
                        resolve(defect);
                    }).catch((e) => reject(e));
            });
        }
    }
};
</script>

<style lang="scss" src="@mixins/ControlPopup/main.scss"></style>
