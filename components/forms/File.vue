<template>
    <md-field :class="classList.field">
        <label v-if="placeholder">{{ placeholder }}</label>
        <md-file
            v-validate
            :data-vv-name="formValidateName"
            v-bind="$attrs"
            @md-change="change($event)"></md-file>
        <span
            v-if="subText"
            class="md-helper-text">{{ subText }}</span>
        <span class="md-error">{{ errors.first(formValidateName) }}</span>
    </md-field>
</template>

<script>
import Mixin from "./mixin";
// TODO: vee-validate не може провалидировать md-input по правилам image и size. Нужно создать кастомную валидацию

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
        val() { return this.value; },
        classList() {
            return { field: { "md-invalid": this.errors.has(this.formValidateName) } };
        }
    },
    methods: {
        change(files) {
            this.removeErrorDisplayed();
            this.$emit('input', files);
        }
    }
};
</script>
