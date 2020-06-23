import auth from "@auth";

export default function({ redirect }) {
    return auth.check(false)
        .then(() => dl.log("Guest check: success!"))
        .catch((e) => {
            if(e.status === 403 || e.status === 401) {
                dl.error("Guest check: failed!");
                redirect("/");
            } else dl.error(e);
        });
}
