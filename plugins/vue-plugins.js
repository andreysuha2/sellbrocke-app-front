import Vue from "vue";
import VeeValidate from "vee-validate";
import Notifications from "vue-notification/dist/ssr";

Vue.use(VeeValidate, {
    inject: false,
    events: "input"
});

Vue.use(Notifications);
