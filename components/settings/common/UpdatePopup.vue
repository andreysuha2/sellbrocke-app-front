<template>
    <md-dialog class="control-popup"
               @md-closed="clearForm"
               @md-clicked-outside="$emit('closePopup')"
               :md-active="showPopup"
    >
        <md-dialog-title>Update Common Settings</md-dialog-title>

        <app-form form-name="update-settings-common" :on-submit="update">
            <app-input
                v-model="RECEIVER_ATTENTION_NAME"
                required
                validate-name="receiver_attention_name"
                validate-rules="required"
                display-error-name="receiver attention name"
                placeholder="Receiver attention name"/>

            <app-input
                v-model="RECEIVER_NAME"
                required
                validate-name="receiver_name"
                validate-rules="required"
                display-error-name="receiver name"
                placeholder="Receiver name"/>

            <app-input
                v-model="ADMIN_EMAIL"
                required
                validate-name="admin_email"
                validate-rules="required|email"
                display-error-name="admin email"
                placeholder="Admin email"/>

            <app-input
                v-model="OFFICE_PHONE"
                required
                validate-name="office_phone"
                validate-rules="required|numeric"
                display-error-name="office phone"
                placeholder="Office phone"/>

            <app-input
                v-model="OFFICE_FAX"
                required
                validate-name="office_fax"
                validate-rules="required|numeric"
                display-error-name="office fax"
                placeholder="Office fax"/>


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
                RECEIVER_ATTENTION_NAME: null,
                RECEIVER_NAME: null,
                ADMIN_EMAIL: null,
                OFFICE_PHONE: null,
                OFFICE_FAX: null
            }
        };
    },
    computed: {
        ...mapGetters('settings/common', { storeData: 'getCommon' }),
        RECEIVER_ATTENTION_NAME: {
            get() { return this.temp.RECEIVER_ATTENTION_NAME || this.storeData.RECEIVER_ATTENTION_NAME; },
            set(RECEIVER_ATTENTION_NAME) { this.setField("RECEIVER_ATTENTION_NAME", RECEIVER_ATTENTION_NAME); }
        },
        RECEIVER_NAME: {
            get() { return this.temp.RECEIVER_NAME || this.storeData.RECEIVER_NAME; },
            set(RECEIVER_NAME) { this.setField("RECEIVER_NAME", RECEIVER_NAME); }
        },
        ADMIN_EMAIL: {
            get() { return this.temp.ADMIN_EMAIL || this.storeData.ADMIN_EMAIL; },
            set(ADMIN_EMAIL) { this.setField("ADMIN_EMAIL", ADMIN_EMAIL); }
        },
        OFFICE_PHONE: {
            get() { return this.temp.OFFICE_PHONE || this.storeData.OFFICE_PHONE; },
            set(OFFICE_PHONE) { this.setField("OFFICE_PHONE", OFFICE_PHONE); }
        },
        OFFICE_FAX: {
            get() { return this.temp.OFFICE_FAX || this.storeData.OFFICE_FAX; },
            set(OFFICE_FAX) { this.setField("OFFICE_FAX", OFFICE_FAX); }
        }
    },
    methods: {
        ...mapActions("settings/common", { fetchData: 'fetchCommon' }),
        ...mapActions('settings', { updateCommon: 'updateSettings' }),
        update() {
            this.formData.set('group', 'common');
            return new Promise((resolve, reject) => {
                this.updateCommon(this.formData)
                    .then(() => this.fetchData())
                    .then(() => {
                        this.$notify({
                            title: 'Update common settings',
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
