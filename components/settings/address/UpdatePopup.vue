<template>
    <md-dialog class="control-popup"
               @md-closed="clearForm"
               @md-clicked-outside="$emit('closePopup')"
               :md-active="showPopup"
    >
        <md-dialog-title>Update Address Settings</md-dialog-title>

        <app-form form-name="update-settings-address" :on-submit="onSubmit">
            <app-input
                v-model="OFFICE_COUNTRY"
                required
                validate-name="office_country"
                validate-rules="required"
                display-error-name="office country"
                placeholder="Office Country"/>

            <app-input
                v-model="OFFICE_STATE"
                required
                validate-name="office_state"
                validate-rules="required"
                display-error-name="office state"
                placeholder="Office State"/>

            <app-input
                v-model="OFFICE_CITY"
                required
                validate-name="office_city"
                validate-rules="required"
                display-error-name="office city"
                placeholder="Office City"/>

            <app-input
                v-model="OFFICE_ADDRESS_LINE"
                required
                validate-name="office_address_line"
                validate-rules="required"
                display-error-name="office address line"
                placeholder="Office Address Line"/>

            <app-input
                v-model="OFFICE_POSTAL_CODE"
                required
                validate-name="office_postal_code"
                validate-rules="required"
                display-error-name="office postal code"
                placeholder="Office Postal Code"/>

            <div class="flex justify-between">
                <md-button
                    type="submit"
                    class="md-primary md-raised">Update
                </md-button>
                <md-button
                    @click="$emit('closePopup')"
                    class="md-accent md-raised">Cancel
                </md-button>
            </div>
        </app-form>

    </md-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import popupMixin from "@mixins/ControlPopup";

export default {
    mixins: [ popupMixin ],
    data() {
        return {
            tempDefault: {
                OFFICE_COUNTRY: null,
                OFFICE_STATE: null,
                OFFICE_CITY: null,
                OFFICE_ADDRESS_LINE: null,
                OFFICE_POSTAL_CODE: null
            }
        };
    },
    computed: {
        ...mapGetters('settings/address', { storeData: 'getAddress' }),
        OFFICE_COUNTRY: {
            get() { return this.temp.OFFICE_COUNTRY || this.storeData.OFFICE_COUNTRY; },
            set(OFFICE_COUNTRY) { this.setField("OFFICE_COUNTRY", OFFICE_COUNTRY); }
        },
        OFFICE_STATE: {
            get() { return this.temp.OFFICE_STATE || this.storeData.OFFICE_STATE; },
            set(OFFICE_STATE) { this.setField("OFFICE_STATE", OFFICE_STATE); }
        },
        OFFICE_CITY: {
            get() { return this.temp.OFFICE_CITY || this.storeData.OFFICE_CITY; },
            set(OFFICE_CITY) { this.setField("OFFICE_CITY", OFFICE_CITY); }
        },
        OFFICE_ADDRESS_LINE: {
            get() { return this.temp.OFFICE_ADDRESS_LINE || this.storeData.OFFICE_ADDRESS_LINE; },
            set(OFFICE_ADDRESS_LINE) { this.setField("OFFICE_ADDRESS_LINE", OFFICE_ADDRESS_LINE); }
        },
        OFFICE_POSTAL_CODE: {
            get() { return this.temp.OFFICE_POSTAL_CODE || this.storeData.OFFICE_POSTAL_CODE; },
            set(OFFICE_POSTAL_CODE) { this.setField("OFFICE_POSTAL_CODE", OFFICE_POSTAL_CODE); }
        }
    },
    methods: {
        ...mapActions('settings/address', { fetchData: 'fetchAddress' }),
        ...mapActions('settings', { updateAddress: 'updateSettings' }),
        onSubmit() {
            this.formData.set('group', 'address');
            return new Promise((resolve, reject) => {
                this.updateAddress(this.formData)
                    .then(() => this.fetchData())
                    .then(() => {
                        this.$notify({
                            title: 'Update address settings',
                            text: 'Your settings was saved successfully!',
                            duration: 3000
                        });
                        this.$emit("closePopup");
                    })
                    .catch((e) => reject(e));
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import 'mixins/ControlPopup/main';
</style>
