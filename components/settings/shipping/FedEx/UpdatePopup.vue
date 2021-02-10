<template>
    <md-dialog class="control-popup"
               @md-closed="clearForm"
               @md-clicked-outside="$emit('closePopup')"
               :md-active="showPopup"
    >
        <md-dialog-title>Update FedEx Settings</md-dialog-title>

        <app-form form-name="update-fedex-common" :on-submit="update">

            <app-input
                v-model="FEDEX_ACCOUNT_NUMBER"
                required
                validate-name="fedex_account_number"
                validate-rules="required"
                display-error-name="fedex account number"
                placeholder="FedEx Account Number"/>

            <app-input
                v-model="FEDEX_METER_NUMBER"
                required
                validate-name="fedex_meter_number"
                validate-rules="required"
                display-error-name="fedex meter number"
                placeholder="FedEx Meter Number"/>

            <app-input
                v-model="FEDEX_KEY"
                required
                type="password"
                validate-name="fedex_key"
                validate-rules="required"
                display-error-name="fedex key"
                placeholder="FedEx key"
                class="secret-field"
            />

            <app-input
                v-model="FEDEX_PASSWORD"
                required
                type="password"
                validate-name="fedex_password"
                validate-rules="required"
                display-error-name="fedex password"
                placeholder="Fedex password"
                class="secret-field"
            />

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
                FEDEX_ACCOUNT_NUMBER: null,
                FEDEX_METER_NUMBER: null,
                FEDEX_KEY: null,
                FEDEX_PASSWORD: null
            }
        };
    },
    computed: {
        ...mapGetters('settings/shipping/fedex', { storeData: 'getFedex' }),
        FEDEX_ACCOUNT_NUMBER: {
            get() { return this.temp.FEDEX_ACCOUNT_NUMBER || this.storeData.FEDEX_ACCOUNT_NUMBER; },
            set(FEDEX_ACCOUNT_NUMBER) { this.setField("FEDEX_ACCOUNT_NUMBER", FEDEX_ACCOUNT_NUMBER); }
        },
        FEDEX_METER_NUMBER: {
            get() { return this.temp.FEDEX_METER_NUMBER || this.storeData.FEDEX_METER_NUMBER; },
            set(FEDEX_METER_NUMBER) { this.setField("FEDEX_METER_NUMBER", FEDEX_METER_NUMBER); }
        },
        FEDEX_KEY: {
            get() { return this.temp.FEDEX_KEY || this.storeData.FEDEX_KEY; },
            set(FEDEX_KEY) { this.setField("FEDEX_KEY", FEDEX_KEY); }
        },
        FEDEX_PASSWORD: {
            get() { return this.temp.FEDEX_PASSWORD || this.storeData.FEDEX_PASSWORD; },
            set(FEDEX_PASSWORD) { this.setField("FEDEX_PASSWORD", FEDEX_PASSWORD); }
        }
    },
    methods: {
        ...mapActions("settings/shipping/fedex", { fetchData: 'fetchFedex' }),
        ...mapActions('settings', { updateFedEx: 'updateSettings' }),
        update() {
            this.formData.set('group', 'fedex');
            return new Promise((resolve, reject) => {
                this.updateFedEx(this.formData)
                    .then(() => this.fetchData())
                    .then(() => {
                        this.$notify({
                            title: 'Update FedEx settings',
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

.secret-field {
    padding-right: 40px;
}
</style>
