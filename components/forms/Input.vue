<template>
    <md-field :class="classList.field">
        <label v-if="placeholder">{{ placeholder }}</label>
        <md-input
            :data-vv-name="formValidateName"
            v-validate
            :data-vv-rules="validateRules"
            :data-vv-as="validateFieldName"
            :type="type"
            :required="required"
            v-model="val"></md-input>
        <span
            v-if="subText"
            class="md-helper-text">{{ subText }}</span>
        <span class="md-error">{{ errors.first(formValidateName) }}</span>
    </md-field>
</template>

<script>
import Mixin from "./mixin";

export default {
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
</script>
