import Vue from "vue";
import VeeValidate from "vee-validate";
import Notifications from "vue-notification";

Vue.use(VeeValidate, {
    inject: false,
    events: "input"
});

Vue.use(Notifications);
