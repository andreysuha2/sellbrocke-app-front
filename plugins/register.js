import Vue from "vue";
import PageTemplate from "@templates/PageTemplate";
import ClickOutside from "vue-click-outside";

Vue.component("app-page", PageTemplate);
Vue.directive("on-click-out", ClickOutside);
