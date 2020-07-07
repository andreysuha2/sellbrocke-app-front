<template>
    <md-field :class="classList.field">
        <label v-if="placeholder">{{ placeholder }}</label>
        <md-file
            :data-vv-name="formValidateName"
            v-validate
            v-bind="$attrs"
            :data-vv-rules="validateRules"
            :data-vv-as="validateFieldName"
            :required="required"
            @md-change="$emit('input', $event)"></md-file>
        <span
            v-if="subText"
            class="md-helper-text">{{ subText }}</span>
        <span class="md-error">{{ errors.first(formValidateName) }}</span>
    </md-field>
</template>

<script>
import Mixin from "./mixin";

export default {
    inheritAttrs: false,
    mixins: [ Mixin ],
    props: {
        placeholder: {
            type: [ String, Boolean ],
            default: false
        },
        value: { default: "" },
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
