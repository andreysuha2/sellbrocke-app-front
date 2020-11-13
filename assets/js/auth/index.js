import http from "@http/auth";

class Authenticate {
    constructor() {
        Object.defineProperties(this, {
            _cookies: { value: null, configurable: true },
            _tokenPropName: { value: "__authToken" }
        });
    }

    get token() {
        return this._cookies.get(this._tokenPropName) || null;
    }

    set token(token) {
        const now = new Date(),
            expiresAt = new Date((new Date()).setFullYear(now.getFullYear() + 1));
        this._cookies.set(this._tokenPropName, token, { expires: expiresAt });
    }

    // set global access to cookies install in cookieResolve plugin
    setCookies(cookies) {
        Object.defineProperty(this, "_cookies", { value: cookies });
    }

    login(data) {
        return new Promise((resolve, reject) => {
            http.authorize(data)
                .then((resp) => {
                    const { user, token } = resp.data;
                    this.token = token;
                    resolve(user);
                }).catch((e) => reject(e));
        });
    }

    logout() {
        return new Promise((resolve, reject) => {
            http.logout()
                .then(() => {
                    this._cookies.remove(this._tokenPropName);
                    resolve();
                }).catch((e) => reject(e));
        });
    }

    check(isAuth = true) {
        return new Promise((resolve, reject) => {
            if(!this.token) {
                if(isAuth) reject({ status: 401 });
                else resolve();
            } else {
                http.check()
                    .then(() => {
                        if(isAuth) resolve();
                        else reject({ status: 401 });
                    }).catch(e => {
                        if(isAuth && e.response && (e.response.status === 401 || e.response.status === 403)) {
                            reject({ status: e.response.status });
                        } else if(!isAuth && e.response && (e.response.status === 401 || e.response.status === 403)) {
                            resolve();
                        } else reject(e);
                    });
            }
        });
    }
}

export default new Authenticate();
