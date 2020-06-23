<template>
    <div class="login-page">
        <div class="login-page--title">
            <h1>Login now</h1>
        </div>
        <app-form
            :on-submit="auth"
            form-name="loginForm"
            class="login-page--form">
            <app-input
                placeholder="You email"
                required
                validate-name="email"
                validate-rules="required|email"
                displayErrorName="email"
                v-model="email"/>
            <app-input
                placeholder="You password"
                v-model="password"
                required
                validate-rules="required"
                displayErrorName="password"
                type="password"/>
            <div class="flex justify-between items-center">
                <md-button type="submit" class="md-raised md-primary">Login</md-button>
                <nuxt-link to="/forgot-password">Forgot password?</nuxt-link>
            </div>
        </app-form>
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
            return auth.login({ email: this.email, password: this.password })
                .then(() => this.$router.go("/"));
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
