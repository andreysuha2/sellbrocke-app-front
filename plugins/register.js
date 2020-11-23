import Vue from "vue";
import PageTemplate from "@templates/PageTemplate";
import AppForm from "@components/forms/Form";
import AppInput from "@components/forms/input/Input";
import AppSelect from "@components/forms/input/Select";
import AppTextarea from "@components/forms/input/Textarea";
import AppFile from "@components/forms/File";
import AppPagination from "@components/global/Pagiantion";
import AppPreloader from "@components/global/Preloader";
import AppSearch from "@components/global/Search";
import ClickOutside from "vue-click-outside";

Vue.component("app-page", PageTemplate);
Vue.component("app-form", AppForm);
Vue.component("app-input", AppInput);
Vue.component("app-select", AppSelect);
Vue.component("app-textarea", AppTextarea);
Vue.component("app-file", AppFile);
Vue.component("app-pagination", AppPagination);
Vue.component("app-preloader", AppPreloader);
Vue.component("app-search", AppSearch);

Vue.directive("on-click-out", ClickOutside);
