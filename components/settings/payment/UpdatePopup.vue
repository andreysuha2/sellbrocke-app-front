<template>
    <md-dialog class="control-popup"
               @md-closed="clearForm"
               @md-clicked-outside="$emit('closePopup')"
               :md-active="showPopup"
    >
        <md-dialog-title>Update Payment Settings</md-dialog-title>

        <app-form form-name="update-settings-common" :on-submit="update">

            <app-input
                v-model="PAYPAL_CLIENT_ID"
                required
                validate-name="paypal_client_id"
                validate-rules="required"
                display-error-name="paypal client id"
                placeholder="Paypal client id"/>

            <app-input
                v-model="PAYPAL_CLIENT_SECRET"
                required
                type="password"
                validate-name="paypal_client_secret"
                validate-rules="required"
                display-error-name="paypal client secret"
                placeholder="Paypal client secret"
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
import popupMixin from "@mixins/ControlPopup";
import { mapActions, mapGetters } from "vuex";

export default {
    mixins: [ popupMixin ],
    data() {
        return {
            tempDefault: {
                PAYPAL_CLIENT_ID: null,
                PAYPAL_CLIENT_SECRET: null
            }
        };
    },
    computed: {
        ...mapGetters('settings/payment', { storeData: 'getPayment' }),
        PAYPAL_CLIENT_ID: {
            get() { return this.temp.PAYPAL_CLIENT_ID || this.storeData.PAYPAL_CLIENT_ID; },
            set(PAYPAL_CLIENT_ID) { this.setField("PAYPAL_CLIENT_ID", PAYPAL_CLIENT_ID); }
        },
        PAYPAL_CLIENT_SECRET: {
            get() { return this.temp.PAYPAL_CLIENT_SECRET || this.storeData.PAYPAL_CLIENT_SECRET; },
            set(PAYPAL_CLIENT_SECRET) { this.setField("PAYPAL_CLIENT_SECRET", PAYPAL_CLIENT_SECRET); }
        }
    },
    methods: {
        ...mapActions("settings/payment", { fetchData: 'fetchPayment' }),
        ...mapActions('settings', { updatePayment: 'updateSettings' }),
        update() {
            this.formData.set('group', 'payment');
            return new Promise((resolve, reject) => {
                this.updatePayment(this.formData)
                    .then(() => this.fetchData())
                    .then(() => {
                        this.$notify({
                            title: 'Update payment settings',
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
