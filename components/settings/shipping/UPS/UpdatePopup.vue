<template>
    <md-dialog class="control-popup"
               @md-closed="clearForm"
               @md-clicked-outside="$emit('closePopup')"
               :md-active="showPopup"
    >
        <md-dialog-title>Update FedEx Settings</md-dialog-title>

        <app-form form-name="update-fedex-common" :on-submit="update">

            <app-input
                v-model="UPS_URL"
                required
                validate-name="ups_url"
                validate-rules="required"
                display-error-name="ups url"
                placeholder="UPS Url"/>

            <app-input
                v-model="UPS_PRODUCTION_URL"
                required
                validate-name="ups_production_url"
                validate-rules="required"
                display-error-name="ups production url"
                placeholder="UPS Production Url"/>

            <app-input
                v-model="UPS_USER_ID"
                required
                validate-name="ups_user_id"
                validate-rules="required"
                display-error-name="ups user id"
                placeholder="UPS User ID"/>

            <app-input
                v-model="UPS_SHIPPER_NUMBER"
                required
                validate-name="ups_shipper_number"
                validate-rules="required"
                display-error-name="UPS shipper number"
                placeholder="UPS Shipper number"/>

            <app-input
                v-model="UPS_PASSWORD"
                required
                type="password"
                validate-name="ups_password"
                validate-rules="required"
                display-error-name="UPS password"
                placeholder="UPS password"
                class="secret-field"
            />

            <app-input
                v-model="UPS_ACCESS_KEY"
                required
                type="password"
                validate-name="ups_access_key"
                validate-rules="required"
                display-error-name="ups access key"
                placeholder="UPS Access Key"
                class="secret-field"
            />

            <app-select
                required
                v-model="UPS_SANDBOX"
                validate-name="company"
                validate-rules="required"
                placeholder="Device company"
                display-error-name="company">

                <template v-if="UPS_SANDBOX">
                    <md-option key="true" value="true">True</md-option>
                    <md-option key="false" value="false">False</md-option>
                </template>

                <template v-else>
                    <md-option key="false" value="false">False</md-option>
                    <md-option key="true" value="true">True</md-option>
                </template>
            </app-select>

            <app-input
                v-if="haveSandbox"
                v-model="UPS_SANDBOX_URL"
                required
                validate-name="ups_sandbox_url"
                validate-rules="required"
                display-error-name="ups sandbox url"
                placeholder="UPS Sandbox Url"/>

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
import popupMixin from "@mixins/ControlPopup";
import { mapActions, mapGetters } from "vuex";
import Textarea from "@components/forms/input/Textarea";

export default {
    components: { Textarea },
    mixins: [ popupMixin ],
    data() {
        return {
            tempDefault: {
                UPS_URL: null,
                UPS_PRODUCTION_URL: null,
                UPS_USER_ID: null,
                UPS_SHIPPER_NUMBER: null,
                UPS_PASSWORD: null,
                UPS_ACCESS_KEY: null,
                UPS_SANDBOX: null,
                UPS_SANDBOX_URL: null
            }
        };
    },
    computed: {
        ...mapGetters('settings/shipping/ups', { storeData: 'getUps' }),
        UPS_URL: {
            get() { return this.temp.UPS_URL || this.storeData.UPS_URL; },
            set(UPS_URL) { this.setField("UPS_URL", UPS_URL); }
        },
        UPS_PRODUCTION_URL: {
            get() { return this.temp.UPS_PRODUCTION_URL || this.storeData.UPS_PRODUCTION_URL; },
            set(UPS_PRODUCTION_URL) { this.setField("UPS_PRODUCTION_URL", UPS_PRODUCTION_URL); }
        },
        UPS_USER_ID: {
            get() { return this.temp.UPS_USER_ID || this.storeData.UPS_USER_ID; },
            set(UPS_USER_ID) { this.setField("UPS_USER_ID", UPS_USER_ID); }
        },
        UPS_SHIPPER_NUMBER: {
            get() { return this.temp.UPS_SHIPPER_NUMBER || this.storeData.UPS_SHIPPER_NUMBER; },
            set(UPS_SHIPPER_NUMBER) { this.setField("UPS_SHIPPER_NUMBER", UPS_SHIPPER_NUMBER); }
        },
        UPS_PASSWORD: {
            get() { return this.temp.UPS_PASSWORD || this.storeData.UPS_PASSWORD; },
            set(UPS_PASSWORD) { this.setField("UPS_PASSWORD", UPS_PASSWORD); }
        },
        UPS_ACCESS_KEY: {
            get() { return this.temp.UPS_ACCESS_KEY || this.storeData.UPS_ACCESS_KEY; },
            set(UPS_ACCESS_KEY) { this.setField("UPS_ACCESS_KEY", UPS_ACCESS_KEY); }
        },
        UPS_SANDBOX: {
            get() { return this.temp.UPS_SANDBOX || this.storeData.UPS_SANDBOX; },
            set(UPS_SANDBOX) { this.setField("UPS_SANDBOX", UPS_SANDBOX); }
        },
        UPS_SANDBOX_URL: {
            get() { return this.temp.UPS_SANDBOX_URL || this.storeData.UPS_SANDBOX_URL; },
            set(UPS_SANDBOX_URL) { this.setField("UPS_SANDBOX_URL", UPS_SANDBOX_URL); }
        },
        haveSandbox() {
            return this.temp.UPS_SANDBOX === true
                || this.temp.UPS_SANDBOX === 'true'
                || this.storeData.UPS_SANDBOX === true
                || this.storeData.UPS_SANDBOX === 'true';
        }
    },
    methods: {
        ...mapActions("settings/shipping/ups", { fetchData: 'fetchUps' }),
        ...mapActions('settings', { updateUps: 'updateSettings' }),
        update() {
            this.formData.set('group', 'ups');
            return new Promise((resolve, reject) => {
                this.updateUps(this.formData)
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
