<template>
    <div class="login-page">
        <div class="login-page--title">
            <h1>Login now</h1>
        </div>
        <div class="login-page--form">
            <md-field>
                <label>You email</label>
                <md-input v-model="email"></md-input>
            </md-field>
            <md-field>
                <label>You password</label>
                <md-input type="password" v-model="password"></md-input>
            </md-field>
            <div class="flex justify-between items-center">
                <md-button
                    @click="auth"
                    class="md-raised md-primary">Login</md-button>
                <nuxt-link to="/forgot-password">Forgot password?</nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
import auth from "@auth";

export default {
    layout: "auth",
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        auth() {
            auth.login({ email: this.email, password: this.password })
                .then((resp) => dl.log(resp));
        }
    }
};
</script>

<style lang="scss" scoped>
.login-page {
    max-width: 458px;
    width: 100%;

    &--title {
        margin-bottom: 50px;
        text-align: center;
        color: $appColor2;
    }

    &--form {
        box-shadow: $appBoxShadow2;
        padding: 30px;
    }
}
</style>
