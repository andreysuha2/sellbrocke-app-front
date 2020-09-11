<template>
    <md-dialog class="control-popup"
               @md-closed="clearForm"
               @md-clicked-outside="$emit('closePopup')"
               :md-active="showPopup">
        <template v-if="showPopup">
            <md-dialog-title>Update password for "{{ merchant.name }}"</md-dialog-title>
            <app-form
                :on-submit="update"
                form-name="update-merchant-password">
                <app-input
                    v-model="oldPassword"
                    type="password"
                    required
                    validate-name="old_password"
                    validate-rules="required"
                    display-error-name="current password"
                    placeholder="Current password"/>
                <app-input
                    ref="password"
                    v-model="newPassword"
                    type="password"
                    required
                    validate-name="new_password"
                    validate-rules="required|min:8"
                    display-error-name="new password"
                    placeholder="New password"/>
                <app-input
                    v-model="confirmPassword"
                    type="password"
                    required
                    validate-name="confirm_password"
                    validate-rules="required|min:8"
                    display-error-name="confirm password"
                    placeholder="Confirm new password"/>
                <div class="flex justify-between">
                    <md-button
                        type="submit"
                        class="md-primary md-raised">Update</md-button>
                    <md-button
                        @click="$emit('closePopup')"
                        class="md-accent md-raised">Cancel</md-button>
                </div>
            </app-form>
        </template>
    </md-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import popupMixin from "@mixins/ControlPopup";

export default {
    mixins: [ popupMixin ],
    data() {
        return {
            tempDefault: {
                oldPassword: null,
                newPassword: null,
                confirmPassword: null
            }
        };
    },
    computed: {
        ...mapGetters("merchants/merchant", { merchant: "currentMerchant" }),
        oldPassword: {
            get() { return this.temp.oldPassword; },
            set(password) { this.setField("oldPassword", password); }
        },
        newPassword: {
            get() { return this.temp.newPassword; },
            set(password) { this.setField("newPassword", password); }
        },
        confirmPassword: {
            get() { return this.temp.confirmPassword; },
            set(password) { this.setField("confirmPassword", password); }
        }
    },
    methods: {
        ...mapActions("merchants/merchant", { updatePassword: "updatePassword" }),
        update() {
            return new Promise((resolve, reject) => {
                this.updatePassword(this.formData)
                    .then(() => {
                        this.$notify({
                            title: "Update password!",
                            text: "Update password success! All devices with old password is logout",
                            duration: 3000
                        });
                        this.$emit("closePopup");
                        resolve();
                    })
                    .catch((e) => reject(e));
            });
        }
    }
};
</script>

<style lang="scss" src="@mixins/ControlPopup/main.scss"></style>
