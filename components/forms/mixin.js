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
    }
};
