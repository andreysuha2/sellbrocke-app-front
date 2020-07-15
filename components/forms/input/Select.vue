<template>
    <md-field :class="classList.field">
        <label v-if="placeholder">{{ placeholder }}</label>
        <md-select
            :data-vv-name="formValidateName"
            v-validate
            v-bind="$attrs"
            :data-vv-rules="validateRules"
            :data-vv-as="validateFieldName"
            :type="type"
            :required="required"
            @input="removeErrorDisplayed()"
            v-model="val">
            <slot></slot>
        </md-select>
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
        value: {
            type: [ String, Number, Array ],
            default() {
                return "";
            }
        }
    }
};
</script>
