import Vue from "vue";
import Notifications from "vue-notification";
import VeeValidate from "vee-validate";

Vue.use(Notifications);

Vue.use(VeeValidate, {
    inject: false,
    events: "input"
});
