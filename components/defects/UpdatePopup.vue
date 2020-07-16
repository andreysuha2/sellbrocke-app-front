<template>
    <md-dialog
        class="control-popup"
        @md-clicked-outside="closePopup"
        :md-active="showPopup">
        <md-dialog-title>Update defect "{{ defectName }}"</md-dialog-title>
        <app-form
            v-if="storeData"
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
        ...mapGetters("defects/currentDefect", { storeData: "currentDefect" }),
        ...mapState("defects/currentDefect", { id: "defectId" }),
        defectName() { return this.storeData ? this.storeData.name : null; },
        updateData() { return { id: this.id, data: this.formData }; },
        // form props
        name: {
            get() { return this.temp.name ? this.temp.name : this.storeData.name; },
            set(name) { this.setField("name", name); }
        },
        priceReduction: {
            get() { return this.temp.priceReduction ? this.temp.priceReduction : this.storeData.priceReduction; },
            set(percent) { this.setField("priceReduction", percent); }
        },
        description: {
            get() { return this.temp.description !== null ? this.temp.description : this.storeData.description; },
            set(desc) { this.setField("description", desc); }
        }
    },
    methods: {
        ...mapActions("defects", { updateDefect: "updateDefect" }),
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
    }
};
</script>

<style lang="scss" src="@mixins/ControlPopup/main.scss"></style>
