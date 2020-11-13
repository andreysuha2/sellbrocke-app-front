import auth from "@auth";

export default ({ redirect }) => auth.check()
    .then(() => dl.log("Auth check: success!"))
    .catch((e) => {
        if(e.status === 401) {
            dl.error("Auth check: failed");
            redirect("/login");
        } else dl.error(e);
    });
