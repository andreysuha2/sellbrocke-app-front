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
            <md-checkbox v-model="updatePassword" class="md-primary">Update password</md-checkbox>
            <template v-if="updatePassword">
                test
            </template>
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
import { mapActions, mapState } from "vuex";
import popupMixin from "@mixins/ControlPopup";

export default {
    mixins: [ popupMixin ],
    data() {
        return {
            updatePassword: false,
            tempDefault: {
                name: null,
                email: null,
                oldPassword: null,
                newPassword: null,
                confirmPassword: null
            }
        };
    },
    computed: {
        ...mapState("user", { admin: (state) => state.currentUser }),
        name: {
            get() { return this.temp.name; },
            set(name) { this.setField("name", name, true); }
        },
        email: {
            get() { return this.temp.email; },
            set(email) { this.setField("email", email); }
        }
    },
    methods: {
        ...mapActions("devices", { addDevice: "createDevice" }),
        create() {
            return new Promise((resolve, reject) => {
                this.addDevice(this.formData)
                    .then((device) => {
                        this.$notify({
                            title: `Device added`,
                            text: `Device ${device.name} was created`,
                            duration: 3000
                        });
                        this.$emit("closePopup");
                        this.$emit("addDevice", device);
                        this.clearForm();
                        resolve(device);
                    }).catch((e) => reject(e));
            });
        }
    }
};
</script>

<style lang="scss" src="@mixins/ControlPopup/main.scss"></style>
