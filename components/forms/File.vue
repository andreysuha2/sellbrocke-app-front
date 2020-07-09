<template>
    <md-field :class="classList.field">
        <label v-if="placeholder">{{ placeholder }}</label>
        <md-file
            v-validate
            :data-vv-name="formValidateName"
            v-bind="$attrs"
            :value="val"
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
    data() {
        return { files: null };
    },
    computed: {
        val: {
            get() {
                if(this.files && this.files.length) {
                    return [ ...this.files ].map((file) => file.name).join(", ");
                }
                return typeof this.value === "string" ? this.value.split("/").reverse()[0] : null;
            }
        },
        classList() {
            return { field: { "md-invalid": this.errors.has(this.formValidateName) } };
        }
    },
    methods: {
        change(files) {
            this.files = files;
            this.removeErrorDisplayed();
            this.$emit('input', files);
        }
    }
};
</script>
