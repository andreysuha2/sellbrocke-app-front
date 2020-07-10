import Mixin from "../mixin";

export default {
    inheritAttrs: false,
    mixins: [ Mixin ],
    props: {
        type: {
            type: String,
            default: "text"
        },
        placeholder: {
            type: [ String, Boolean ],
            default: false
        },
        value: {
            type: [ String, Number ],
            default: ""
        },
        required: {
            type: Boolean,
            default: false
        },
        subText: {
            type: [ String, Boolean ],
            default: false
        }
    },
    computed: {
        val: {
            get() { return this.value; },
            set(val) { this.$emit("input", val); }
        },
        classList() {
            return { field: { "md-invalid": this.errors.has(this.formValidateName) } };
        }
    }
};
