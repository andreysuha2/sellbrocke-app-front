<template>
    <md-dialog
        class="control-popup"
        @md-closed="clearForm"
        @md-clicked-outside="$emit('closePopup')"
        :md-active="showPopup">
        <md-dialog-title>Update admin</md-dialog-title>
        <app-form
            :on-submit="update"
            form-name="update-admin">
            <app-input
                v-model="name"
                required
                validate-name="name"
                validate-rules="required"
                display-error-name="name"
                placeholder="Name"/>
            <app-input
                v-model="email"
                required
                validate-name="email"
                validate-rules="required|email"
                display-error-name="email"
                placeholder="Email"/>
            <md-checkbox @change="clearPasswords"
                         v-model="updatePassword" class="md-primary">Update password</md-checkbox>
            <template v-if="updatePassword">
                <app-input
                    v-model="currentPassword"
                    required
                    type="password"
                    validate-name="current_password"
                    validate-rules="required"
                    display-error-name="password"
                    placeholder="Current password"/>
                <app-input
                    v-model="newPassword"
                    required
                    type="password"
                    validate-name="new_password"
                    validate-rules="required|min:8"
                    display-error-name="password"
                    placeholder="New password"/>
                <app-input
                    v-model="confirmPassword"
                    required
                    type="password"
                    validate-name="confirm_password"
                    validate-rules="required|min:8"
                    display-error-name="password"
                    placeholder="Confirm password"/>
            </template>
            <div class="flex justify-between">
                <md-button
                    type="submit"
                    :disabled="!hasUpdate"
                    class="md-primary md-raised">Update</md-button>
                <md-button
                    @click="$emit('closePopup')"
                    class="md-accent md-raised">Cancel</md-button>
            </div>
        </app-form>
    </md-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import popupMixin from "@mixins/ControlPopup";

export default {
    mixins: [ popupMixin ],
    data() {
        return {
            updatePassword: false,
            tempDefault: {
                name: null,
                email: null,
                currentPassword: null,
                newPassword: null,
                confirmPassword: null
            }
        };
    },
    computed: {
        ...mapState("user", { storeData: (state) => state.currentUser }),
        name: {
            get() { return this.temp.name || this.storeData.name; },
            set(name) { this.setField("name", name); }
        },
        email: {
            get() { return this.temp.email || this.storeData.email; },
            set(email) { this.setField("email", email); }
        },
        currentPassword: {
            get() { return this.temp.currentPassword; },
            set(password) { this.setField("currentPassword", password); }
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
        ...mapActions("user", { updateUser: "updateUser" }),
        update() {
            return new Promise((resolve, reject) => {
                this.updateUser(this.formData)
                    .then((user) => {
                        this.$notify({
                            title: "Update user",
                            text: "User is updated",
                            duration: 3000
                        });
                        this.$emit("closePopup");
                        resolve(user);
                    })
                    .catch((e) => reject(e));
            });
        },
        clearPasswords() {
            this.clearField("currentPassword");
            this.clearField("newPassword");
            this.clearField("confirmPassword");
        }
    }
};
</script>

<style lang="scss" src="@mixins/ControlPopup/main.scss"></style>
