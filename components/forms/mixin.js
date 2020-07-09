export default {
    inject: [ "$validator", "formName" ],
    props: {
        validateName: {
            type: String,
            default: ""
        },
        validateRules: {
            type: [ String, Object ],
            default: ""
        },
        validateOn: {
            type: String,
            default: ''
        },
        displayErrorName: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: ""
        }
    },
    computed: {
        formValidateName() {
            return `${this.formName}.${this.validateName}`;
        },
        validateFieldName() {
            return this.displayErrorName || this.validateName;
        }
    },
    methods: {
        addValidation(property, { name=null, rules=null, alias=null }={}) {
            const validateName = name || this.formValidateName,
                [ scope ] = validateName.split('.'),
                __this = this,
                isExist = this.$validator.fields.items.some((field) => field.name === validateName);
            if(!isExist) {
                this.$validator.attach({
                    name: validateName,
                    rules: rules || this.validateRules,
                    alias: alias || this.displayErrorName,
                    scope,
                    getter() {
                        dl.log(__this[property]);
                        return __this[property];
                    }
                });
            }
        },
        removeErrorDisplayed(validateName = null) {
            const name = validateName || this.formValidateName;
            dl.log(name);
            if(this.errors.has(name)) this.errors.remove(name);
        },
        removeValidation(validateName = null) {
            const name = validateName || this.formValidateName,
                [ scope ] = name.split(".");
            this.$validator.detach(name, scope);
        }
    }
};
