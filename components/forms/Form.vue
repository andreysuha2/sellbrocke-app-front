<template>
    <form @submit.prevent="submit"
        autocomplete="off"
        :data-vv-scope="formName">
        <app-preloader
            :active="preload"
            :md-diameter="100"
            :md-stroke="10"
            md-mode="indeterminate">
            <slot></slot>
        </app-preloader>
    </form>
</template>

<script>
export default {
    inject: [ "$validator" ],
    props: {
        formName: {
            type: String,
            required: true
        },
        onSubmit: {
            type: [ Function, Boolean ],
            default: false,
            validator(handler) {
                return handler && typeof handler === "function" || !handler;
            }
        },
        noValidate: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return { preload: false };
    },
    provide() {
        return { formName: this.formName };
    },
    methods: {
        submit() {
            if(this.onSubmit) {
                if(!this.noValidate) this.validate();
                else this.submited();
            } else if(!this.noValidate) this.validate();
        },
        validate() {
            return new Promise((resolve, reject) => {
                this.$validator.validate(`${this.formName}.*`)
                    .then((valid) => {
                        if(valid && this.onSubmit) this.submited();
                    }).catch(e => reject(e));
            });
        },
        submited() {
            if(!this.onSubmit) dl.error("Undefined submit callback");
            else {
                this.preload = true;
                this.onSubmit()
                    .catch((e) => this.handleSubmitErrors(e))
                    .finally(() => { this.preload = false; });
            }
        },
        handleSubmitErrors(e) {
            const code = e.response ? e.response.status : null;
            if(code && (code === 422 || code === 403)) {
                let { errors, message } = e.response.data;
                if(errors) {
                    Object.entries(errors).forEach((error) => {
                        let errorName = error[0],
                            errorMessage = error[1][0],
                            errorFullName = `${this.formName}.${errorName}`;
                        if(this.$validator.fields.find({ name: errorFullName })) {
                            this.$validator.errors.add({
                                scope: this.formName,
                                field: errorName,
                                msg: errorMessage
                            });
                        } else {
                            this.$notify({
                                title: "Error message",
                                type: "error",
                                message: errorMessage
                            });
                        }
                    });
                }
                if(message) {
                    this.$notify({
                        type: "error",
                        title: "Error message",
                        text: message
                    });
                }
            } else {
                dl.error(e);
                this.$notify({
                    title: "Error message",
                    type: "error",
                    text: "Something went wrong! Try again later."
                });
            }
        }
    },
    beforeDestroy() {
        this.errors.clear();
    }
};
</script>
