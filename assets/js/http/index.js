import axios from "axios";
import auth from "@auth";

const url = `${process.env.NUXT_ENV_API_BASE_URL}/api/admin`,
    interceptors = {
        response: {
            success(context, response) { return response; },
            error(context, error) {
                if(error.response) dl.log(error.response);
                else dl.log(error);
                return Promise.reject(error);
            }
        },
        request: {
            config(context, config) {
                if(auth.token) {
                    config.headers.Authorization = `Bearer ${auth.token}`;
                }
                return config;
            },
            error(context, error) { return Promise.reject(error); }
        }
    };

class ApiHttp {
    constructor({ slug=null, headers={} } = {}) {
        const baseURL = slug ? `${url}/${slug}` : url;
        Object.defineProperties(this, {
            baseURL: { value: baseURL },
            query: {
                value: axios.create({
                    baseURL,
                    "Content-Type": "application/json",
                    "headers": {
                        'X-Requested-With': 'XMLHttpRequest',
                        ...headers
                    }
                })
            }
        });
        this.query.interceptors.response.use(
            (response) => interceptors.response.success(this, response),
            (error) => interceptors.response.error(this, error)
        );
        this.query.interceptors.request.use(
            (config) => interceptors.request.config(this, config),
            (error) => interceptors.request.error(this, error)
        );
    }

    group(groupPath, callback) {
        const __this = this,
            // eslint-disable-next-line no-confusing-arrow
            getPath = (path) => path ? `${groupPath}/${path}` : groupPath,
            group = (path, callback) => __this.group(`${groupPath}/${path}`, callback),
            query = {
                request(config = { url: null }) {
                    return __this.query.request({ url: getPath(config.url), ...config });
                },
                get(path = null, config ={}) { return __this.query.get(getPath(path), config); },
                post(path = null, data = {}, config = {}) { return __this.query.post(getPath(path), data, config); },
                put(path = null, data= {}, config = {}) { return __this.query.put(getPath(path), data, config); },
                delete(path = null, config = {}) { return __this.query.delete(getPath(path), config); },
                options(path = null, config = {}) { return __this.query.options(getPath(path), config); },
                patch(path = null, config = {}) { return __this.query.patch(getPath(path), config); },
                head(path = null, config = {}) { return __this.query.head(getPath(path), config); }
            };
        return callback(query, group);
    }
}

export default ApiHttp;
