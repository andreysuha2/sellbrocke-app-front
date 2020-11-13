import Vue from "vue";
import Notifications from "vue-notification";
import VeeValidate from "vee-validate";
import globalMixin from "@mixins/global";

Vue.use(Notifications);

Vue.use(VeeValidate, {
    inject: false,
    events: "input"
});

Vue.mixin(globalMixin);
