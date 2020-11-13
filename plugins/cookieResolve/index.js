import auth from "@auth";

export default ({ app }) => auth.setCookies(app.$cookies);
