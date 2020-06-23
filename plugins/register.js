import Vue from "vue";
import PageTemplate from "@templates/PageTemplate";
import AppForm from "@components/forms/Form";
import AppInput from "@components/forms/Input";
import ClickOutside from "vue-click-outside";

Vue.component("app-page", PageTemplate);
Vue.component("app-form", AppForm);
Vue.component("app-input", AppInput);
Vue.directive("on-click-out", ClickOutside);
