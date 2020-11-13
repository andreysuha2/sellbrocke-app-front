<template>
    <div class="forgot-password">
        <template v-if="sended">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="forgot-password--title">Please, check your E-Mail</h1>
                    <p>We sent password reset link to your email, follow instructions</p>
                </div>
                <md-button
                    to="/login"
                    class="md-raised md-primary">Goto login</md-button>
            </div>
        </template>
        <template v-else>
            <div class="forgot-password--header">
                <h1 class="forgot-password--title">Password Reset</h1>
                <p>Forgot password?</p>
                <p>Enter your registered email and get password reset link</p>
            </div>
            <div class="forgot-password--form flex items-center">
                <md-field>
                    <label>You email</label>
                    <md-input></md-input>
                </md-field>
                <md-button
                    @click="sended = !sended"
                    class="forgot-password--submit md-raised md-primary">Submit</md-button>
            </div>
            <div class="forgot-password--to-login">
                <nuxt-link to="/login">Back to login</nuxt-link>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    layout: "auth",
    data() {
        return { sended: false };
    }
};
</script>

<style lang="scss" scoped>
.forgot-password {
    max-width: 750px;
    width: 100%;

    &--title {
        color: $appColor2;
    }

    &--header {
        text-align: center;
        margin-bottom: 50px;
    }

    &--form {
        box-shadow: $appBoxShadow2;
        padding: 30px;
    }

    &--submit {
        margin-left: 15px;
    }

    &--to-login {
        margin-top: 30px;
        text-align: center;
    }
}
</style>
