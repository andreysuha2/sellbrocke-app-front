import Vue from "vue";
import VueNotification from "vue-notification/dist/ssr";
import VeeValidate from "vee-validate";

Vue.use(VueNotification);

Vue.use(VeeValidate, {
    inject: false,
    events: "input"
});
